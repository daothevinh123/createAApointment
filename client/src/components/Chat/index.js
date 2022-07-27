import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Chat.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatWindow from "./ChatWindow";
function Chat() {
  return (
    <Container fluid className={clsx(styles.wrapper)}>
      <Row>
        <Col sm={3} className={clsx(styles.container1)}>
          <div className={clsx(styles.item1)}>
            <FontAwesomeIcon icon={faBars} className={clsx(styles.faBars)} />
            <input
              type="text"
              className={clsx(styles.searchContact)}
              placeholder="Search"
            />
          </div>
          <div className={clsx(styles.item2)}>
            <div className={clsx(styles.subItem2)}>
              <img
                src="https://photo-cms-plo.zadn.vn/w850/Uploaded/2022/xpckxpiu/2021_02_23/plo-1_qkis.jpg"
                alt="logo"
                className={clsx(styles.avatar)}
              />
              <div className={clsx(styles.brief)}>
                <p className={clsx(styles.name)}>Name</p>
                <p className={clsx(styles.briefMessage)}>Hello a</p>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={9}>
          <ChatWindow />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;