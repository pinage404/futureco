/* @flow */
import React, { useEffect, useState } from 'react'
import {
	animated,
	config as configPresets,
	Spring,
	Trail,
	Transition
} from 'react-spring'
import type { SpringConfig } from 'react-spring'
import type { Node } from 'react'

type Props = {
	children: Node,
	config?: SpringConfig,
	style?: Object,
	className?: string,
	delay?: number
}

// Todo : better animate with fromRight on desktop
export const fromBottom = ({
	children,
	config = configPresets.stiff,
	style: inheritedStyle = {},
	delay = 0
}: Props) => (
	<Trail
		keys={React.Children.map(children, (_, i) => i)}
		native={true}
		delay={delay}
		config={config}
		from={{ opacity: 0, y: 20 }}
		leave={{ opacity: 0, y: -20 }}
		to={{ opacity: 1, y: 0 }}>
		{/* eslint-disable-next-line react/display-name */}
		{React.Children.map(children, (item, i) => ({ y, ...style }) => (
			<animated.div
				key={i}
				style={{
					transform: y.interpolate(y => `translate3d(0, ${y}px,0)`),

					...style,
					...inheritedStyle
				}}>
				{item}
			</animated.div>
		))}
	</Trail>
)
export const fromTop = ({
	children,
	config = configPresets.stiff,
	style: inheritedStyle = {},
	delay = 0
}: Props) => (
	<Trail
		keys={React.Children.map(children, (_, i) => i)}
		native={true}
		delay={delay}
		config={config}
		leave={{ opacity: 0, y: 20 }}
		from={{ opacity: 0, y: -20 }}
		to={{ opacity: 1, y: 0 }}>
		{/* eslint-disable-next-line react/display-name */}
		{React.Children.map(children, (item, i) => ({ y, ...style }) => (
			<animated.div
				key={i}
				style={{
					transform: y.interpolate(y =>
						y ? `translate3d(0, ${y}px,0)` : 'none'
					),
					...style,
					...inheritedStyle
				}}>
				{item}
			</animated.div>
		))}
	</Trail>
)

export const leftToRight = ({
	children,
	config = configPresets.stiff,
	delay = 0
}: Props) => (
	<Transition
		from={{
			opacity: 0,
			transform: 'translateX(100%)'
		}}
		native
		keys={location.pathname}
		enter={{
			opacity: 1,
			transform: 'translateX(0%)'
		}}
		config={config}
		delay={delay}
		leave={{
			opacity: 0,
			position: 'absolute',
			transform: 'translateX(-100%)'
		}}>
		{style => <animated.div style={style}>{children}</animated.div>}
	</Transition>
)

export const fadeIn = ({
	children,
	config = configPresets.default,
	delay = 0
}: Props) => (
	<Spring
		native={true}
		delay={delay}
		config={config}
		from={{ opacity: 0 }}
		to={{
			opacity: 1
		}}>
		{style => <animated.div style={style}>{children}</animated.div>}
	</Spring>
)

export function appear({
	children,
	className,
	unless = false,
	config = configPresets.default,
	delay = 0,
	style
}) {
	const [show, setShow] = useState(unless)
	useEffect(() => {
		window.setTimeout(() => setShow(true), 0)
	}, [])

	return (
		<Spring
			delay={delay}
			native
			config={config}
			to={{
				opacity: show ? 1 : 0,
				height: show ? 'auto' : '0px'
			}}>
			{animStyle => (
				<animated.div style={{ ...style, ...animStyle }} className={className}>
					{children}
				</animated.div>
			)}
		</Spring>
	)
}

export default {
	appear,
	fromBottom,
	leftToRight,
	fromTop,
	fadeIn
}
