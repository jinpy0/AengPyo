package com.aengpyo.orderservice.interceptor;

import com.aengpyo.orderservice.SessionConst;
import com.aengpyo.orderservice.exception.MemberException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute(SessionConst.LOGIN_SESSION) == null) {
            log.info("로그인 하지 않은 사용자의 요청 차단 : {}", requestURI);
            throw new MemberException("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        log.info("로그인 한 사용자의 요청 : {}", requestURI);
        return true;
    }
}
