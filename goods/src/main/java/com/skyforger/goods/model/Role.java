package com.skyforger.goods.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.skyforger.goods.model.Permission.MANAGER_CREATE;
import static com.skyforger.goods.model.Permission.MANAGER_DELETE;
import static com.skyforger.goods.model.Permission.MANAGER_READ;
import static com.skyforger.goods.model.Permission.MANAGER_UPDATE;

@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),
    MANAGER(
            Set.of(
                    MANAGER_READ,
                    MANAGER_UPDATE,
                    MANAGER_DELETE,
                    MANAGER_CREATE
            )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
