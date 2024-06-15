import React, {useEffect, useState} from "react";
import BaseFilter from "./BaseFilter";
import MinListFilter from "./MinListFilter";
import OddOrOUFilter from "./OddOrOUFilter";
import SwitchBox from "./SwitchBox";
import { getBotFilterData } from "../../../model/entity/bot";
import styles from "../../../styles/bot/filter.module.scss";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import SearchIcon from '@mui/icons-material/Search';

function BotFilter(props) {
    const [modalShow, setModalShow] = useState(false);
    const [baseFilterOption, setBaseFilterOption] = useState(0);
    const [minListFilter, setMinListFilter] = useState(0);
    const [onlyOddOrOU, setOnlyOddOrOU] = useState(0);
    const [matchDoneInList, setMatchDoneInList] = useState(-1);
    const [filter, setFilter] = useState({});

    const filterBot = async (filter) => {
        console.log(filter);
        setModalShow(false);
        if (!filter["base_filter_option"] &&
            !filter["min_list_filter"] &&
            !filter["odd_or_ou"] &&
            filter["match_done_in_list"] < 0
        ) {
            return;
        }
        props.setCanFilter(false);
        const data = await getBotFilterData(filter);
        props.setdataBotUI(data);
        props.setInFilterMode(true);
        props.setCanFilter(true);
    }

    useEffect(() => {
    let newFilter = {};
    newFilter["base_filter_option"] = baseFilterOption;
    newFilter["min_list_filter"] = minListFilter;
    newFilter["odd_or_ou"] = onlyOddOrOU;
    newFilter["match_done_in_list"] = matchDoneInList;
    props.setFilter(newFilter);
    setFilter(newFilter);
    }, [baseFilterOption, minListFilter, onlyOddOrOU, matchDoneInList]);

    return (
        <div className="">
            <Button className={styles["button-search"]} onClick={() => setModalShow(true)}>Filter Bot <SearchIcon /></Button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                // className={styles["filter-box"]}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Filter Box
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BaseFilter
                        setBaseFilterOption={setBaseFilterOption}
                        baseFilterOption={baseFilterOption}
                        canFilter={props.canFilter}
                    />
                    <OddOrOUFilter
                        setOnlyOddOrOU={setOnlyOddOrOU}
                        onlyOddOrOU={onlyOddOrOU}
                        canFilter={props.canFilter}
                    />
                    <MinListFilter
                        setMinListFilter={setMinListFilter}
                        minListFilter={minListFilter}
                        canFilter={props.canFilter}
                    />
                    <SwitchBox
                        setMatchDoneInList={setMatchDoneInList}
                        matchDoneInList={matchDoneInList}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-info"
                        className="text-black border-4"
                        onClick={() => filterBot(filter).catch(console.error)}>
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BotFilter;
