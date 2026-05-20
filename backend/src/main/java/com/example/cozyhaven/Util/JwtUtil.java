package com.example.cozyhaven.Util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.cozyhaven.Enum.Role;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String key;
    @Value("${jwt.expiration}")
    private int expiration;
    private Key secretkey;

    @PostConstruct

    public void init() {//VALUE WILL BE ASSIGNED AFTER THE OBJ CREATION SO

        secretkey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email, Role role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role.name())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretkey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            extractEmail(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretkey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }

    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretkey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);

    }

}
