import React from 'react';
import styles from './styles.less';
const classNames = require('classnames');

interface FooterProps {
	className?: string;
}

export default class Footer extends React.Component<FooterProps, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const footerClass = classNames(this.props.className, styles.footer);

		return <div className={footerClass}>Footer</div>;
	}
}
