import { create } from 'zustand'

// 권한이 필요한 role들은 여기에서 관리(?)
const useAuthStore = create((set) => ({
    user : null, // 사용자 정보
    token : null, // JWT 토큰
    isAuthenticated : false, // 로그인 여부
    login : (user, token) => set({user, token, isAuthenticated : true}),   // 로그인 성공 시 처리 => 위에 변수 받아서 setter로 변경
    logout : () => set({user: null, token: null, isAuthenticated: false}), // 로그인 실패 시 처리
}));

export default useAuthStore;