import React, { Component } from 'react';
import Layout from '../../components/Layout/index';
import { Flex } from '@chakra-ui/core';

export class Home extends Component {
    render() {
        return (
            <Layout
                title="Home"
            >
                <Flex align="center">
                    Hi
                </Flex>
            </Layout>
        )
    }
}

export default Home
