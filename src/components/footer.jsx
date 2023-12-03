// FooterPagination.jsx
import React from 'react';
import './footer.css';

const FooterPagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => paginate(1)}>First</button>
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
      <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  );
}

export default FooterPagination;
