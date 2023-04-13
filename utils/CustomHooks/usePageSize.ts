import { useIsomorphicLayoutEffect } from 'ahooks';
import React, { useState } from 'react';

const usePageSize = (props) => {
    const { id } = props;
    const [pageWidth, setPageWidth] = useState<number>(0)
    const pageSize = () => {
        setPageWidth(document.getElementById(id)?.offsetWidth || 0);
    }
    useIsomorphicLayoutEffect(() => {
        setPageWidth(document.getElementById(id)?.offsetWidth || 0);
        window.addEventListener('resize', pageSize);
        return () => {
            window.removeEventListener('resize', pageSize);
        }
    }, [])
    return {
        pageWidth: pageWidth - 5,
    };
};

export default usePageSize;