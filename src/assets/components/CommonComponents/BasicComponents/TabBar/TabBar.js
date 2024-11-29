import React from 'react'
import './tabBar.css'
import DuoIcon from '../../../../IconLibrary/DuoIcon'
import Icon from '../../../../IconLibrary/Icon'
import PropTypes from 'prop-types'

export default class TabBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    changeTab = (activeTab) => {
        let { onChange } = this.props
        onChange(activeTab)
    }

    render() {
        let { tabList, activeTab, height, width, padding } = this.props
        return (
            <div className="default-tab-bar">
                {tabList.map((res, index) => (
                    <button
                        className={
                            res.Name === activeTab.Name
                                ? 'default-tab active'
                                : 'default-tab'
                        }
                        style={{
                            width: width,
                            height: height,
                            padding: `0 ${padding} 10px`,
                        }}
                        key={index}
                        disabled={res.Disabled ? res.Disabled : false}
                        onClick={this.changeTab.bind(this, res)}
                    >
                        {res.Icon && (
                            <div className="default-tab-icon">
                                {res.IconType.toLowerCase() === 'duo' ? (
                                    <Icon icon={res.Icon} size={14} />
                                ) : (
                                    <DuoIcon name={res.Icon} size={14} />
                                )}
                            </div>
                        )}
                        {res.Name}
                    </button>
                ))}
            </div>
        )
    }
}

TabBar.defaultProps = {
    tabList: [
        {
            Name: 'Info',
            Icon: 'info',
            IconType: 'single',
            Disabled: false,
        },
    ],
    activeTab: {
        Name: 'Info',
        Icon: 'info',
        IconType: 'single',
        Disabled: false,
    },
    width: 'auto',
    height: '30px',
    padding: '30px',
    onChange: (activeTab) => alert('Active Tab => ' + activeTab.Name),
}

TabBar.propTypes = {
    tabList: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Icon: PropTypes.string,
            IconType: PropTypes.oneOf(['single', 'duo']),
            Disabled: PropTypes.bool,
        })
    ).isRequired,
    activeTab: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Icon: PropTypes.string,
            IconType: PropTypes.oneOf(['single', 'duo']),
            Disabled: PropTypes.bool,
        })
    ).isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    padding: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}
