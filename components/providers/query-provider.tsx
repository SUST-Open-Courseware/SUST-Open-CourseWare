"use client";
import React from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

const QueryProvider = () => {
    return (
        <QueryClientProvider client={queryClient} />
    );
};

export default QueryProvider;
