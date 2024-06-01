import { useState, useEffect } from "react";

export const useTableSearch = ({ searchVal, retrieve }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [origData, setOrigData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const crawl = (user, allValues) => {
            if (!allValues) allValues = [];
            for (var key in user) {
                if (typeof user[key] === "object") crawl(user[key], allValues);
                else allValues.push(user[key] + " ");
            }
            return allValues;
        };
        const fetchData = async () => {
            const { data: users } = await retrieve(searchVal);
            setOrigData(users);
            setFilteredData(users);
            const searchInd = users.map(user => {
                const allValues = crawl(user);
                return { allValues: allValues.toString() };
            });
            setSearchIndex(searchInd);
            if (users) setLoading(false);
        };
        fetchData();
    }, [retrieve]);

    useEffect(() => {
        setLoading(true);
        const crawl = (user, allValues) => {
            if (!allValues) allValues = [];
            for (var key in user) {
                if (typeof user[key] === "object") crawl(user[key], allValues);
                else allValues.push(user[key] + " ");
            }
            return allValues;
        };
        const fetchData = async () => {
            const { data: users } = await retrieve(searchVal);
            setOrigData(users);
            setFilteredData(users);
            const searchInd = users.map(user => {
                const allValues = crawl(user);
                return { allValues: allValues.toString() };
            });
            setSearchIndex(searchInd);
            if (users) setLoading(false);
        };
        fetchData();

    }, [searchVal]);

    return { filteredData, loading };
};
