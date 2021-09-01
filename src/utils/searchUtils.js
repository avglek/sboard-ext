import * as d3 from 'd3'

export function showFindStantion(
  FindStantion,
  iconUID = 'pointer2',
  iconClass = 'pointer'
) {
  const href = `./svg/sprite/point-sprite.svg#${iconUID}`

  if (FindStantion !== '') {
    const allStn = d3.selectAll('#stations')
    allStn.selectAll(`use[href="${href}"]`).remove()

    if (FindStantion !== '0') {
      const stnNode = allStn.selectAll(`#st_${FindStantion}`)
      const anchorNode = stnNode.select('#st')

      if (anchorNode.node()) {
        if (anchorNode.attr('fill')) {
          anchorNode.attr('fill', '#FF0000')
        } else {
          const oval = anchorNode.select('#Oval[stroke]')
          oval.attr('fill', '#FF0000')
        }
      }

      const iconNode = anchorNode.append('use')

      iconNode
        .attr('class', iconClass)
        .attr('href', href)
        .attr('width', '16px')
        .attr('height', '16px')
        .attr('x', '-16px')
      // .attr('x','-10px')
      //.attr('y', '-50px')
    }
  }
}
