import React, {useState} from 'react';

const Pagination = ({totalItems, ITEMS_PER_PAGE, paginate}) => {
    const [currentPage, setActivePage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / ITEMS_PER_PAGE); i++ ) {
        pageNumbers.push(i);
    }

    const handlePaginate = (e, number) => {
        paginate(number);
        setActivePage(number);
    }
    
    return (
        <ul className="pagination">
            {
                pageNumbers.map(number => {
                    return (
                        <li 
                            key={number} 
                            className={currentPage === number ? 
                                "pagination__item pagination__item--active" 
                                : 
                                "pagination__item"}
                        >
                            <span onClick={(e) => handlePaginate(e, number)}>
                                {number}
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Pagination;