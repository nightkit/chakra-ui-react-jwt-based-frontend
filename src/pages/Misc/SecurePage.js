import React from 'react';
import Layout from '../../components/Layout/index';

export default function SecurePage() {
    return (
        <Layout
            title="Secure Page"
            isAuth={true}
        >
            You can not see this page's contents unless you are authenticated.
        </Layout>
    )
}