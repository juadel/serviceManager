import React, { Component } from "react";
import styled from "styled-components";
import {Ticket} from "styled-icons/remix-fill/Ticket";
import {Dashboard} from 'styled-icons/remix-line/Dashboard';
import {Clipboard} from 'styled-icons/fa-solid/Clipboard';
import {Office} from 'styled-icons/icomoon/Office';
import Services from './Services/Services';

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Open Sans', 'sans-serif';    
    height: 100vh;
    background-color: #252529;
    color: #fff;
    @media (max-width: 275px) {
        display: none;
     }
    `;
const SidebarMenu = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style: none;
    width: 100%;
    padding: 0px 30px;
    
    `;
const SidebarMenuItem = styled.li`
        display: flex;    
        height: 40px;
        width: 100%;
        align-items: center;
        padding-left: 30px;
        &:hover {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: inset 3px 0 0 0 #ffffff;
        cursor: pointer;
            
    `;
const Icon = styled.svg`
        width: 20px;
        height: 20px;
    `;
const SidebarMenuItemLabel = styled.p`
        font-family: 'Roboto', 'sans-serif';
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.3;
        text-align: center;
        padding: 12px 0px;
        color: #ffffff;
        margin-left: 20px;
        margin-top: 20px;
        `;
const MenuLogo = styled.div`
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 16px;
        font-size: 24px;
        line-height: 1.5;
        font-weight: 600;
        height: 45px;
        color: #fff;
        
        margin-left: 20px;
        padding-bottom: 1px;
        border-bottom: 1px solid #2e2e33;
    `;
const TicketICon = styled(Ticket)`
        color: white;
    `;
const DashboardICon = styled(Dashboard)`
        color: white;
    `;
const MenuIcon = styled(Clipboard)`
        color: white;
    `;
const CustomerIcon = styled(Office)`
        color: white;
    `;

class Sidebar extends Component {

    render() {

        return (
        <SidebarContainer>
                        <SidebarMenu>
                            <MenuLogo>{""} 
                            <Icon><MenuIcon/></Icon> Service Manager
                            </MenuLogo>
                              <SidebarMenuItem>
                              <Icon> <DashboardICon/></Icon>
                              <SidebarMenuItemLabel>Dashboard</SidebarMenuItemLabel>
                              </SidebarMenuItem>
                              <SidebarMenuItem >
                              <Icon><TicketICon/></Icon>
                              <SidebarMenuItemLabel>Services</SidebarMenuItemLabel>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                              <Icon><CustomerIcon/></Icon>
                              <SidebarMenuItemLabel>Customers</SidebarMenuItemLabel>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                              <Icon></Icon>
                              </SidebarMenuItem>
                        </SidebarMenu>
        </SidebarContainer>
        )
    }
}

export default Sidebar;