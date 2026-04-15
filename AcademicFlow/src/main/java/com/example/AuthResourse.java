package com.example;


import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GET
    @Path("/teachers")
    public List<User> getTeachers() {
        return User.list("role", "teacher");
    }

    @POST
    @Path("/subscribe")
    @Transactional
    public Response subscribe(Subscription sub){
        sub.persist();
        return Response.status(Response.Status.CREATED).entity(sub).build();
    }

    @GET
    @Path("/requests/{teacherId}")
    public List<Map<String, Object>> getRequests(@PathParam("teacherId") Long teacherId) {
        List<Subscription> subs = Subscription.list("teacherId = ?1 and status = 'PENDING'", teacherId);

        return subs.stream().map(sub -> {
            User student = User.findById(sub.studentId);
            Map<String, Object> responseMap = new java.util.HashMap<>();

            responseMap.put("subId", sub.id);
            if (student != null) {
                responseMap.put("studentName", student.firstName + " " + student.lastName);
            } else {
                responseMap.put("studentName", "Неизвестный студент");
            }
            return responseMap;
        }).collect(java.util.stream.Collectors.toList());
    }

    @PUT
    @Path("/accept/{subId}")
    @Transactional
    public Response acceptSubscription(@PathParam("subId") Long subId) {
        Subscription sub = Subscription.findById(subId);
        if (sub != null) {
            sub.status = "ACCEPTED";
            return Response.ok(sub).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }


    @GET
    @Path("/my-students/{teacherId}")
    public List<Map<String, Object>> getMyStudents(@PathParam("teacherId") Long teacherId) {
        List<Subscription> subs = Subscription.list("teacherId = ?1 and status = 'ACCEPTED'", teacherId);
        return subs.stream().map(sub -> {
            User student = User.findById(sub.studentId);
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("subId", sub.id);
            map.put("name", student.firstName + " " + student.lastName);
            return map;
        }).collect(java.util.stream.Collectors.toList());
    }

    @GET
    @Path("/my-teachers/{studentId}")
    public List<Map<String, Object>> getMyTeachers(@PathParam("studentId") Long studentId) {
        List<Subscription> subs = Subscription.list("studentId = ?1 and status = 'ACCEPTED'", studentId);

        return subs.stream().map(sub -> {
            User teacher = User.findById(sub.teacherId);
            Map<String, Object> map = new java.util.HashMap<>();
            if (teacher != null) {
                map.put("subId", sub.id);
                map.put("teacherId", teacher.id);
                map.put("name", teacher.firstName + " " + teacher.lastName);
            }
            return map;
        }).collect(java.util.stream.Collectors.toList());
    }

    @GET
    @Path("/available-teachers/{studentId}")
    public List<User> getAvailableTeachers(@PathParam("studentId") Long studentId) {
        List<Subscription> subs = Subscription.list("studentId", studentId);
        List<Long> attachedTeacherIds = subs.stream()
                .map(sub -> sub.teacherId)
                .collect(Collectors.toList());

        List<User> allTeachers = User.list("role", "teacher");

        return allTeachers.stream()
                .filter(t -> !attachedTeacherIds.contains(t.id))
                .collect(Collectors.toList());
    }
}

