package com.nird.nird.controllers;

import com.nird.nird.DTO.AuthResponse;
import com.nird.nird.DTO.LoginRequest;
import com.nird.nird.DTO.SignupRequest;
import com.nird.nird.configurations.JwtUtil;
import com.nird.nird.entity.User;
import com.nird.nird.model.Role;
import com.nird.nird.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthController(UserRepository users,
                          PasswordEncoder encoder,
                          JwtUtil jwtUtil,
                          AuthenticationManager authManager) {
        this.users = users;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
    }

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody SignupRequest req) {
        if (users.existsByUsername(req.username) || users.existsByEmail(req.email)) {
            throw new RuntimeException("Username or email already in use");
        }

        Role role = Role.valueOf(req.role.toUpperCase());

        User u = new User(req.username, req.email, encoder.encode(req.password), role);
        users.save(u);

        String token = jwtUtil.generateToken(u.getUsername(), u.getRole().name());
        return new AuthResponse(token, u.getUsername(), u.getRole().name());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        // authenticate using email + password
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email, req.password));

        // find user by email
        User u = users.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + req.email));

        // generate JWT with email as subject
        String token = jwtUtil.generateToken(u.getEmail(), u.getRole().name());
        return new AuthResponse(token, u.getEmail(), u.getRole().name());
    }

}
