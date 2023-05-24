package com.skyforger.goods.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoodRequest {
    private String name;
    private int cost;
    private String description;
    private int amount;
}
