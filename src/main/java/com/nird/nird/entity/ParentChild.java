package com.nird.nird.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "ParentChild")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParentChild {

    @EmbeddedId
    private ParentChildId id;

    @ManyToOne
    @MapsId("parentId")
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;

    @ManyToOne
    @MapsId("childId")
    @JoinColumn(name = "child_id", nullable = false)
    private User child;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
