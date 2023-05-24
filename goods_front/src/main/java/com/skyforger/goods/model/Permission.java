package com.skyforger.goods.model;

import lombok.RequiredArgsConstructor;
import lombok.Getter;

@RequiredArgsConstructor
public enum Permission {
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete")
    ;
    @Getter
    private final String permission;
}
