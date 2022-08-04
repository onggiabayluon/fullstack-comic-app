import { useEffect, useState, useRef, useCallback } from "react";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import debounce from "lodash.debounce";

import * as searchServices from "~/services/searchService";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { SearchIcon } from "~/components/Icons";
import styles from "./Search.module.scss";
import ComicSearchCard from "~/components/ComicSearchCard";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkValueAndSearch = useCallback(
    debounce(async (searchValue) => {
      if (!searchValue.trim()) {
        setSearchResult([]);
        return;
      }

      const fetchApi = async () => {
        setLoading(true);

        const result = await searchServices.search(searchValue);

        setSearchResult(result);
        setLoading(false);
      };

      fetchApi();
    }, 500),
    []
  );

  useEffect(() => {
    checkValueAndSearch(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    // Using a wrapper <div> tag around the reference element solves
    // this by creating a new parentNode context.
    <div className={cx("search-wrapper")}>
      <HeadlessTippy
        interactive
        // ShowResult is true and search result > 0 then show stuff
        visible={showResult && searchResult?.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Comics</h4>
              {searchResult?.length > 0 &&
                searchResult.map((result) => (
                  <ComicSearchCard key={result.id} data={result} />
                ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search comics"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
