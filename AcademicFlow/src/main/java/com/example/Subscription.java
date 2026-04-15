package com.example;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Subscription extends PanacheEntity {
    public Long studentId;
    public Long teacherId;
    public String status;
}