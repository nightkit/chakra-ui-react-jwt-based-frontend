import React from 'react';
import Layout from '../../components/Layout/index';

export default function UnsecurePage() {
    return (
        <Layout
            title="Unsecure Page"
            isAuth={false}
        >
            You can see this page's contents while you are not authenticated as well.
        </Layout>
    )
}
