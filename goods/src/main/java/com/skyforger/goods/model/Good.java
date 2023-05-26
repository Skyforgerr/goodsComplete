package com.skyforger.goods.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR")
    private String name;
    @Column(columnDefinition = "INTEGER")
    private int cost;
    @Column(columnDefinition = "VARCHAR")
    private String description;
    @Column(columnDefinition = "INTEGER")
    private int amount;

}
