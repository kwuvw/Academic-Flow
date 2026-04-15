package com.example;


import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResourse {

    @POST
    @Path("/register")
    @Transactional
    public Response register(User user) {
        user.persist();
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @POST
    @Path("/login")
    public Response login(User credentials) {
        User user = User.find("email = ?1 and password = ?2", credentials.email, credentials.password).firstResult();

        if (user != null) {
            return Response.ok(user).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
    @PUT
    @Path("update-role/{id}")
    @Consumes(MediaType.TEXT_PLAIN)
    @Transactional
    public Response updateRole(@PathParam("id") Long id, String role) {
        User user = User.findById(id);
        if (user != null) {
            user.role = role;
            return Response.ok(user).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }


    @GET
    @Path("/user/{id}")
    public Response getUser(@PathParam("id") Long id) {
        User user = User.findById(id);
        if (user != null) {
            return Response.ok(user).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

}

