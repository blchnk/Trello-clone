import React, { useRef, useState } from 'react';
import style from './Search.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import cx from 'classnames';

export default function Search({ textForSearch, setTextForSearch }) {
    const [searchInput, showSearchInput] = useState(false);
    // const [value, setValue] = useState('');
    const inputRef = useRef(null);

    return (
        <>
            <div className={style.search}>
                <div className={style.searchInputBody}>
                    <input className={cx(style.searchInput, searchInput && style.showSearch)}
                        ref={inputRef}
                        type="text"
                        value={textForSearch}
                        onChange={e => setTextForSearch(e.target.value)}
                        placeholder='Type to search...'
                    />
                </div>
                <SearchIcon onClick={() => showSearchInput(!searchInput)} />
            </div>
        </>
    )
}
