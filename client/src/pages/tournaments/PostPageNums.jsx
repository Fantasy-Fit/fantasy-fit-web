import "./PostPageNums.css";

const PostPageNums = ({ numOfPages, pageNum, setPageNum }) => {
    const pageArray = [];
    for (let i = 0; i < numOfPages; i++) {
        pageArray.push(i + 1);
    };
    const pageNums = pageArray.map((page, i) => {
        return (
            <li
                className="post-page-number"
                key={`page-number-${i + 1}`}
                onClick={() => setPageNum(page - 1)}
                style={pageNum === page - 1 ? { fontWeight: "bold" } : null}
            >{page}
            </li>
        );
    });

    return (
        <>
            <ol className="post-page-number-list"
            >Page {pageNums}
            </ol>
        </>
    );
};

export default PostPageNums;
