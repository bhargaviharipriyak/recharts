//https://jsfiddle.net/awohx19L/

const DEMO_CR = 25

let params = {
	width: 150,
  height: 75,
  radius: 5,
  offset: 15,
  placement: 'TL',
}

const points = {
	A: {x: 150, y: 190, p: 'B'},
	B: {x: 120, y: 160, p: 'T'},
	C: {x: 30, y: 160, p: 'BL', sdx: 1, edy: -1},
	D: {x: 30, y: 30, p: 'TL', sdy: 1, edx: 1},
	E: {x: 270, y: 30, p: 'TR', sdx: -1, edy: 1},
	F: {x: 270, y: 160, p: 'BR', sdy: -1, edx: -1},
	G: {x: 180, y: 160, p: 'T'},
}

const positions = {
	L: {x: 570, y: 250},
	T: {x: 470, y: 300},
	R: {x: 370, y: 250},
	B: {x: 470, y: 200},
  BL: {x: 470, y: 200},
  BR: {x: 470, y: 200},
  TR: {x: 470, y: 300},
  TL: {x: 470, y: 300},
}


const getTopTooltipPath = () => {
	const top = -params.offset - params.height 
	return `M 0,0
  	L ${-params.offset},${-params.offset} 
    H ${-params.width / 2 + params.radius} 
    Q ${-params.width / 2},${-params.offset}  
    ${-params.width / 2},${-params.offset - params.radius} 
    V ${top + params.radius} 
    Q ${-params.width / 2},${top}  
    ${-params.width / 2 + params.radius},${top}
    H ${params.width / 2 - params.radius}
    Q ${params.width / 2},${top}  
    ${params.width / 2},${top + params.radius} 
    V ${-params.offset - params.radius}
    Q ${params.width / 2},${-params.offset}  
    ${params.width / 2 - params.radius},${-params.offset}
    H ${params.offset} z` 
}

const getBottomTooltipPath = () => {
	const bottom = params.offset + params.height 
	return `M 0,0
  	L ${-params.offset},${params.offset} 
    H ${-params.width / 2 + params.radius} 
    Q ${-params.width / 2},${params.offset}  
    ${-params.width / 2},${params.offset + params.radius} 
    V ${bottom - params.radius} 
    Q ${-params.width / 2},${bottom}  
    ${-params.width / 2 + params.radius},${bottom}
    H ${params.width / 2 - params.radius}
    Q ${params.width / 2},${bottom}  
    ${params.width / 2},${bottom - params.radius} 
    V ${params.offset + params.radius}
    Q ${params.width / 2},${params.offset}  
    ${params.width / 2 - params.radius},${params.offset}
    H ${params.offset} z` 
}

const getLeftTooltipPath = () => {
	const left = -params.offset - params.width
	return `M 0,0
  	L ${-params.offset},${params.offset}
    V ${params.height / 2 - params.radius}
    Q ${-params.offset},${params.height / 2}
    ${-params.offset - params.radius},${params.height / 2}
    H ${left + params.radius}
    Q ${left},${params.height / 2}
    ${left},${params.height / 2 - params.radius}
    V ${-params.height / 2 + params.radius}
    Q ${left},${-params.height / 2}
    ${left + params.radius},${-params.height / 2}
    H ${-params.offset - params.radius}
    Q ${-params.offset},${-params.height / 2}
    ${-params.offset},${-params.height / 2 + params.radius}
    V ${-params.offset} z`
}

const getRightTooltipPath = () => {
	const right = params.offset + params.width
	return `M 0,0
  	L ${params.offset},${params.offset}
    V ${params.height / 2 - params.radius}
    Q ${params.offset},${params.height / 2}
    ${params.offset + params.radius},${params.height / 2}
    H ${right - params.radius}
    Q ${right},${params.height / 2}
    ${right},${params.height / 2 - params.radius}
    V ${-params.height / 2 + params.radius}
    Q ${right},${-params.height / 2}
    ${right - params.radius},${-params.height / 2}
    H ${params.offset + params.radius}
    Q ${params.offset},${-params.height / 2}
    ${params.offset},${-params.height / 2 + params.radius}
    V ${-params.offset} z`
}

const getTopLeftTooltipPath = () => {
	const top = -params.offset - params.height 
	return `M 0,0
  	L ${params.radius-params.offset},${-params.offset} 
    H ${-params.width  + params.radius} 
    Q ${-params.width },${-params.offset}  
    ${-params.width },${-params.offset - params.radius} 
    V ${top + params.radius} 
    Q ${-params.width},${top}  
    ${-params.width  + params.radius},${top}
    H ${params.offset- params.radius}
    Q ${params.offset},${top}  
    ${params.offset },${top + params.radius} 
    V ${-params.offset - params.radius}
    Q ${params.offset },${-params.offset}  
    ${params.radius},${-params.offset}
    H ${( params.radius) } z` 
}

const getTopRightTooltipPath = () => {
	const top = -params.offset - params.height 
	return `M  ${-(params.height - params.radius) },0
  	L  ${-(params.height - params.radius) },${-params.offset} 
    H ${-params.width / 2 + params.radius} 
    Q ${-params.width / 2},${-params.offset}  
    ${-params.width / 2},${-params.offset - params.radius} 
    V ${top + params.radius} 
    Q ${-params.width / 2},${top}  
    ${-params.width / 2 + params.radius},${top}
    H ${params.width / 2 - params.radius}
    Q ${params.width / 2},${top}  
    ${params.width / 2},${top + params.radius} 
    V ${-params.offset - params.radius}
    Q ${params.width / 2},${-params.offset}  
    ${params.width / 2 - params.radius},${-params.offset}
    H ${-(params.height - (params.offset+params.radius))} z` 
}


const getBottomLeftTooltipPath = () => {
	const bottom = params.offset + params.height 
	return `M 0,0
  	L ${-params.offset},${params.offset}
    H ${-params.width  + params.radius} 
    Q ${-params.width },${params.offset}  
    ${-params.width },${params.offset + params.radius} 
    V ${bottom - params.radius} 
    Q ${-params.width},${bottom}  
    ${-params.width + params.radius},${bottom}
    H ${params.offset}
    Q ${params.offset+ params.radius},${bottom}  
    ${params.offset+ params.radius},${bottom-params.radius } 
    V ${params.offset+params.radius}
    Q ${params.offset+ params.radius},${params.offset}  
    ${params.offset  },${params.offset}  
    H ${(params.offset - params.radius) } z` 
}

const getBottomRightTooltipPath = () => {
	const bottom = params.offset + params.height 
	return `M ${-(params.height - params.radius) },0
  	L ${-(params.height - params.radius) },${params.offset} 
    H ${-params.width / 2 + params.radius} 
    Q ${-params.width / 2},${params.offset}  
    ${-params.width / 2},${params.offset + params.radius} 
    V ${bottom - params.radius} 
    Q ${-params.width / 2},${bottom}  
    ${-params.width / 2 + params.radius},${bottom}
    H ${params.width / 2 - params.radius}
    Q ${params.width / 2},${bottom}  
    ${params.width / 2},${bottom - params.radius} 
    V ${params.offset + params.radius}
    Q ${params.width / 2},${params.offset}  
    ${params.width / 2 - params.radius},${params.offset}
    H ${-(params.height - (params.offset+params.radius)) } z` 
}



const getTooltipPath = () => {
	switch(params.placement) {

  	case 'L': return getLeftTooltipPath()
  	case 'T': return getTopTooltipPath()
    case 'R': return getRightTooltipPath()
    case 'B': return getBottomTooltipPath()
    case 'TR': return getTopRightTooltipPath()
    case 'TL': return getTopLeftTooltipPath()
    case 'BR': return getBottomRightTooltipPath()
    case 'BL': return getBottomLeftTooltipPath()
  }
}

const svg = d3.select('svg')
svg.append('circle').attr('cx', 150).attr('cy', 150).attr('r', 5).attr('fill', 'red')
const container = svg.append('g')
const tooltip = container.append('path').classed('tooltip', true)




const addPath = (path, markerEnd = 'url(#path-arrow)') => {
	svg.append('path').attr('d', path)
  	.classed('demo-path', true) 
  	.attr('marker-end', markerEnd) 
}

const addLinePath = (from, to) => {
	const start = points[from]
  const end = points[to]
  const sx = start.x + (start.edx || 0) * DEMO_CR
  const sy = start.y + (start.edy || 0) * DEMO_CR
  const ex = end.x + (end.sdx || 0) * DEMO_CR
  const ey = end.y + (end.sdy || 0) * DEMO_CR
	const path = `M ${sx},${sy} L ${ex},${ey}`
	addPath(path)
}

const addCornerPath = (key) => {
	const point = points[key]
  const sx = point.x + (point.sdx || 0) * DEMO_CR
  const sy = point.y + (point.sdy || 0) * DEMO_CR
  const ex = point.x + (point.edx || 0) * DEMO_CR
  const ey = point.y + (point.edy || 0) * DEMO_CR
  const path = `M ${sx},${sy} Q ${point.x},${point.y} ${ex},${ey}`
  console.log('Path: ', path)
	addPath(path, 'url(#path-arrow-long)')
}

const addDescription = (x, y, text) => {
	const element = svg.append('text')
  element.text(text)
  	.classed('description', true)
    .attr('x', x).attr('y', y)
  return element
}

const currentPath1 = addDescription(20, 360, '')
const currentPath2 = addDescription(20, 380, '')

const resetTooltip = () => {
	let path = getTooltipPath()
  console.log(path);
  tooltip.attr('d', path)
  
  const index = path.indexOf(' ', path.length / 2)
  const path1 = path.substr(0, index)
  const path2 = path.substr(index + 1)
  currentPath1.text(path1)
  currentPath2.text(path2)
  
  const pos = positions[params.placement]
  container.attr('transform', `translate(150,150)`)
}


const addPositionControl = (xPos, yPos, label) => {
  const g = svg.append('g')
	const onClick = () => {
  	svg.selectAll('.position-control').classed('selected', false)
    g.classed('selected', true)
    params.placement = label
    resetTooltip()
  }
  
  g.classed('position-control', true)
  	.classed('selected', label == 'T')
  	.attr('transform', `translate(${xPos},${yPos})`)
    .on('click', onClick)

	g.append('circle').attr('r', 15)
	g.append('text').text(label)
    .attr('x', 0).attr('y', 6)
    .attr('text-anchor', 'middle')
}





addPositionControl(540, 45, 'TL')
addPositionControl(575, 45, 'T')
addPositionControl(610, 45, 'TR')


addPositionControl(540, 80, 'L')
addPositionControl(575, 80, 'C')
addPositionControl(610, 80, 'R')



addPositionControl(540, 115, 'BL')
addPositionControl(575, 115, 'B')
addPositionControl(610, 115, 'BR')
resetTooltip()