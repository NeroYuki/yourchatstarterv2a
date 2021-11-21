import { Component } from "react";
import { Container, Sidenav, Sidebar, Nav, Navbar, Dropdown, Icon, Header, Content, Breadcrumb } from 'rsuite'
import { BillManager, BlogManager, UserManager, ServiceManager } from "../Component";
import { DashboardPanel } from "../Component/AdminPanelComponents/DashboardPanel";
import { InfoPanel } from "../Component/AdminPanelComponents/InfoPanel";

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
};

const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Dropdown
                        placement="topStart"
                        trigger="click"
                        renderTitle={children => {
                            return <Icon style={iconStyles} icon="cog" />;
                        }}
                    >
                        <Dropdown.Item>Help</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

export class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true,
            currentPageTitle: "Dashboard" 
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            expand: !this.state.expand
        });
    }

    render() {
        const { expand } = this.state;
        const LoadedComponet = (this.state.currentPageTitle === "Users") ? <UserManager />
            : (this.state.currentPageTitle === "Billing") ? <BillManager />
            : (this.state.currentPageTitle === "Subscription Plan") ? <ServiceManager />
            : (this.state.currentPageTitle === "Blog") ? <BlogManager />
            : (this.state.currentPageTitle === "Info")? (<InfoPanel />)
            : (this.state.currentPageTitle === "Dashboard")? (<DashboardPanel />)
            : (<p>This page is empty</p>)

        return (
            <div className="show-fake-browser sidebar-page" style={{textAlign: 'left', height: '100vh'}}>
                <Container>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column' }}
                        width={expand ? 260 : 56}
                        collapsible
                    >
                        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                            <Sidenav.Header>
                                <div style={headerStyles}>
                                    <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                                    <span style={{ marginLeft: 12 }}>Admin Panel</span>
                                </div>
                            </Sidenav.Header>
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />} onSelect={() => {this.setState({currentPageTitle: "Dashboard"})}}>
                                        Dashboard
                                    </Nav.Item>
                                    <Nav.Item eventKey="2" icon={<Icon icon="group" />} onSelect={() => {this.setState({currentPageTitle: "Info"})}}>
                                        Info
                                    </Nav.Item>
                                    <Dropdown
                                        eventKey="3"
                                        trigger="hover"
                                        title="Managing"
                                        icon={<Icon icon="magic" />}
                                        placement="rightStart"
                                    >
                                        <Dropdown.Item eventKey="3-1" onSelect={() => {this.setState({currentPageTitle: "Users"})}}>Users</Dropdown.Item>
                                        <Dropdown.Item eventKey="3-2" onSelect={() => {this.setState({currentPageTitle: "Billing"})}}>Billing</Dropdown.Item>
                                        <Dropdown.Item eventKey="3-3" onSelect={() => {this.setState({currentPageTitle: "Subscription Plan"})}}>Subscription Plan</Dropdown.Item>
                                        <Dropdown.Item eventKey="3-4" onSelect={() => {this.setState({currentPageTitle: "Blog"})}}>Blog</Dropdown.Item>
                                    </Dropdown>
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                        <NavToggle expand={expand} onChange={this.handleToggle} />
                    </Sidebar>

                    <Container style={{padding: 20, height: '100vh', overflowY: 'scroll'}}>
                        <Header>
                            <Breadcrumb>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>AdminPanel</Breadcrumb.Item>
                                <Breadcrumb.Item active>{this.state.currentPageTitle}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Header>
                        <Content>{LoadedComponet}</Content>
                    </Container>
                </Container>
            </div>
        );
    }
}