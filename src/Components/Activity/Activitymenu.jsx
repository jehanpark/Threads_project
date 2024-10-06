import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CustomArrowIcon, CustomArrowUpIcon } from "../Common/Icon";

const Contain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const MenuContainer = styled.div`
  width: 240px;
  position: relative;
`;

const MenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  color: ${(props) => props.theme.fontcolor};
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  gap: 10px;

  path {
    stroke: ${(props) => props.theme.fontcolor};
  }
`;

const MenuItems = motion(styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
`);

const Item = motion(styled.div`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: #000;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
    border-radius: 4px;
  }
`);

const ActivityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const items = ["모두", "요청", "답글", "친한친구"];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // 외부 클릭 감지

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // 처음 렌더링 시 한 번만 실행

  const menuItemsVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <Contain>
      <MenuContainer ref={menuRef}>
        <MenuTitle onClick={handleToggle}>
          <span>활동</span>
          {isOpen ? (
            <CustomArrowUpIcon width={20} />
          ) : (
            <CustomArrowIcon width={20} />
          )}
        </MenuTitle>
        {isOpen && (
          <MenuItems
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuItemsVariants}
          >
            {items.map((item, index) => (
              <Item
                key={index}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                {item}
              </Item>
            ))}
          </MenuItems>
        )}
      </MenuContainer>
    </Contain>
  );
};

export default ActivityMenu;
