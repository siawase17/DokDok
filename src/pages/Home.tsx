// src/pages/Home.tsx

import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useBookSearch } from "../hooks/useBookSearch";
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import useTokenManager from '../hooks/useTokenManager';

export default function Home() {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>("");
    const { searchResults, loading, error } = useBookSearch(query);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery('');
        navigate(`/search?q=${query}`);
    };

    const handleNewButtonClick = () => {
        setQuery('');
        navigate(`/search?q=${query}`);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const { hasAccessToken } = useTokenManager();
    const { handleLogout, handleCancelAccount } = useAuth();
    
    const handleNavigateToMyBooks = () => {
        navigate('/myBooks');
    };

    const handleNavigateToDokDokCalendar = () => {
        navigate('/calendar');
    };

    const handleNavigateToJoin = () => {
        navigate('/auth/join');
    };

    const handleNavigateToLogin = () => {
        navigate('/auth/login');
    };

    const handleNavigateToResetPassword = () => {
        navigate('/auth/resetPwd');
    };

    const isLoggedIn = hasAccessToken();

    return (
        <HomeStyle>
            <div id="sidebar">
                <div>
                    <form id="search-form" role="search" onSubmit={handleSearchSubmit}>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            value={query}
                            onChange={handleInputChange}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <button onClick={handleNewButtonClick}>검색</button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <p onClick={handleNavigateToMyBooks}>나만의 서재</p>
                        </li>
                        <li>
                            <p onClick={handleNavigateToDokDokCalendar}>독독 캘린더</p>
                        </li>
                    </ul>
                </nav>
                <div id="auth-container">
                    {isLoggedIn ? (
                        <>
                            <p onClick={handleLogout}>로그아웃</p>
                            <p onClick={handleNavigateToResetPassword}>비밀번호 변경</p>
                            <p onClick={handleCancelAccount}>회원 탈퇴</p>
                        </>
                    ) : (
                        <>
                            <p onClick={handleNavigateToJoin}>회원가입</p>
                            <p onClick={handleNavigateToLogin}>로그인</p>
                        </>
                    )}
                </div>
            </div>
            <div id="detail">
                <Outlet context={{ searchResults, loading, error }}/>
            </div>
        </HomeStyle>
    );
}

const HomeStyle = styled.div`
    display: flex;
    width: 100vw;
    max-width: 100%;
    min-height: 100vh;
    height: auto;

    #sidebar {
        width: 22rem;
        background-color: #CAF0F8;
        border-right: solid 1px #e3e3e3;
        display: flex;
        flex-direction: column;
    }

    #sidebar>* {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    #sidebar h1 {
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 1rem 2rem;
        border-top: 1px solid #e3e3e3;
        order: 1;
        line-height: 1;
    }

    #sidebar h1::before {
        content: url("data:image/svg+xml,%3Csvg width='25' height='18' viewBox='0 0 25 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.4127 6.4904C18.6984 6.26581 18.3295 6.34153 17.5802 6.25965C16.4219 6.13331 15.9604 5.68062 15.7646 4.51554C15.6551 3.86516 15.7844 2.9129 15.5048 2.32334C14.9699 1.19921 13.7183 0.695046 12.461 0.982805C11.3994 1.22611 10.516 2.28708 10.4671 3.37612C10.4112 4.61957 11.1197 5.68054 12.3363 6.04667C12.9143 6.22097 13.5284 6.3087 14.132 6.35315C15.2391 6.43386 15.3241 7.04923 15.6236 7.55574C15.8124 7.87508 15.9954 8.18975 15.9954 9.14193C15.9954 10.0941 15.8112 10.4088 15.6236 10.7281C15.3241 11.2334 14.9547 11.5645 13.8477 11.6464C13.244 11.6908 12.6288 11.7786 12.0519 11.9528C10.8353 12.3201 10.1268 13.3799 10.1828 14.6234C10.2317 15.7124 11.115 16.7734 12.1766 17.0167C13.434 17.3056 14.6855 16.8003 15.2204 15.6762C15.5013 15.0866 15.6551 14.4187 15.7646 13.7683C15.9616 12.6032 16.423 12.1505 17.5802 12.0242C18.3295 11.9423 19.1049 12.0242 19.8071 11.6253C20.5491 11.0832 21.212 10.2696 21.212 9.14192C21.212 8.01428 20.4976 6.83197 19.4127 6.4904Z' fill='%23F44250'/%3E%3Cpath d='M7.59953 11.7459C6.12615 11.7459 4.92432 10.5547 4.92432 9.09441C4.92432 7.63407 6.12615 6.44287 7.59953 6.44287C9.0729 6.44287 10.2747 7.63407 10.2747 9.09441C10.2747 10.5536 9.07172 11.7459 7.59953 11.7459Z' fill='black'/%3E%3Cpath d='M2.64217 17.0965C1.18419 17.093 -0.0034949 15.8971 7.72743e-06 14.4356C0.00352588 12.9765 1.1994 11.7888 2.66089 11.7935C4.12004 11.797 5.30772 12.9929 5.30306 14.4544C5.29953 15.9123 4.10366 17.1 2.64217 17.0965Z' fill='black'/%3E%3Cpath d='M22.3677 17.0965C20.9051 17.1046 19.7046 15.9217 19.6963 14.4649C19.6882 13.0023 20.8712 11.8017 22.3279 11.7935C23.7906 11.7854 24.9911 12.9683 24.9993 14.4251C25.0075 15.8866 23.8245 17.0883 22.3677 17.0965Z' fill='black'/%3E%3C/svg%3E%0A");
        margin-right: 0.5rem;
        position: relative;
        top: 1px;
    }

    #sidebar>div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1.1rem;
        border-bottom: 1px solid #b3b3b37d;
    }

    #sidebar>div form {
        position: relative;
    }

    #sidebar>div form input[type="search"] {
        width: 100%;
        padding-left: 2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 0.625rem 0.75rem;
        background-size: 1rem;
        position: relative;
    }

    #sidebar>div form input[type="search"].loading {
        background-image: none;
    }

    #sidebar>div button {
        background-color: #03045E;
        border-width: 1px;
        border-color: #b3b3b37d;
        border-radius: 8px;
        color: #f0f0f0;
        font-size: 1.15rem;
        font-weight: 700;
        padding: 0.5rem 1.2rem;
    }

    #search-spinner {
        width: 1rem;
        height: 1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");
        animation: spin 1s infinite linear;
        position: absolute;
        left: 0.625rem;
        top: 0.75rem;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    #sidebar nav {
        flex: 1;
        overflow: auto;
    }

    #sidebar nav .active i {
        color: inherit;
    }

    #sidebar ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    #sidebar li {
        margin: 0.25rem 0;
    }

    #sidebar nav p {
        font-size: 1.15rem;
        font-weight: 600;
        padding: 7px;
        border-radius: 5px;
    }   

    #sidebar nav p:hover {
        background: #ADE8F4;
    }

    #sidebar img {
        width: 200px;
        height: 130px;
    }

    #detail {
        flex: 1;
        margin: 12px 20px;
    }

    #auth-container {
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    align-items: flex-start !important; /* 왼쪽 정렬 */
}

    #auth-container p {
        margin: 0;
    }
`