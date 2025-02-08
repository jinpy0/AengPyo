package com.aengpyo.orderservice.controller;

import com.aengpyo.orderservice.domain.Grade;
import com.aengpyo.orderservice.domain.member.Member;
import com.aengpyo.orderservice.dto.member.MemberRegisterRequest;
import com.aengpyo.orderservice.dto.member.MemberResponse;
import com.aengpyo.orderservice.exception.MemberException;
import com.aengpyo.orderservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<MemberResponse> register(@Validated @RequestBody MemberRegisterRequest registerRequest,
                                                   BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new MemberException("유효성 검사 실패", HttpStatus.BAD_REQUEST);
        }

        if (memberService.findMemberByLoginId(registerRequest.getLoginId()).isPresent()) {
            throw new MemberException("이미 존재하는 아이디입니다.", HttpStatus.BAD_REQUEST);
        }

        Member member = new Member(registerRequest.getLoginId(), registerRequest.getPassword(), registerRequest.getName());
        member.setGrade(Grade.BRONZE);

        Member registeredMember = memberService.register(member);

        return ResponseEntity.ok(new MemberResponse(
                registeredMember.getId(),
                registeredMember.getLoginId(),
                registeredMember.getName(),
                registeredMember.getGrade()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMember(@PathVariable long id) {

        Member member = memberService.findMemberById(id)
                .orElseThrow(() -> new MemberException("회원이 존재하지 않습니다.", HttpStatus.NOT_FOUND));

        return ResponseEntity.ok(new MemberResponse(
                member.getId(),
                member.getLoginId(),
                member.getName(),
                member.getGrade()
        ));
    }
}
