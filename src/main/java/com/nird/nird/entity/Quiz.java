package com.nird.nird.entity;

import com.nird.nird.model.CorrectOption;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Quizzes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(length = 255)
    private String optionA;

    @Column(length = 255)
    private String optionB;

    @Column(length = 255)
    private String optionC;

    @Column(length = 255)
    private String optionD;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CorrectOption correctOption;

    // --- Getters & Setters ---
    // ...
}