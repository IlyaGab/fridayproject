import React from 'react';

export const PATH = {
    ChangePass:'/change-pass-page',
    Login:'/',
    RecoveryPass: '/recovery-pass-page',
    Profile: '/profile-page',
    Registration: '/registration-page',
    Test: '/test-page'
}

const Pages = () => {
    return (
        <div >
            {/*<Routes>*/}
            {/*    <Route path={PATH.Registration} element={<RegistartionPage/>}/>*/}
            {/*    <Route path={PATH.RecoveryPass} element={<PasswordRecoveryPage/>}/>*/}
            {/*    <Route path={PATH.ChangePass} element={<ChangePasswordPage/>}/>*/}
            {/*    <Route path={PATH.Profile} element={<ProfilePage/>}/>*/}
            {/*    <Route path={PATH.Test} element={<TestPage/>}/>*/}
            {/*    <Route path={'/*'} element={<ErrorPage/>}/>*/}
            {/*</Routes>*/}
        </div>
    );
};

export default Pages;