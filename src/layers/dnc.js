import { select, selectAll, xml } from 'd3'

const icon2 = './svg/icons/dnc/dnc_sp.svg'
const abandonedIcon = './svg/icons/b_trains_dnc.svg'
const fillUp = '#22E329'
const fillDown = '#FC5656'

export async function addEvent({
  dncData,
  dncLoading,
  dncRegion,
  stormRegionID,
  openModal,
  fetchDncUchData,
  fetchAbandonedTrains,
  abandonedData,
  abandonedLoad,
  abandonedRegion,
}) {
  if (
    stormRegionID === dncRegion &&
    !dncLoading &&
    dncData &&
    dncRegion !== 0
  ) {
    await showDncSpeed(dncData, openModal, fetchDncUchData)
  }
  if (abandonedData && !abandonedLoad) {
    await showAbandoned(abandonedData, openModal, fetchAbandonedTrains)
  }
}

export function resetEvent() {
  const dncNode = select('#dnc_active').select("g[id^='dnc_']")
  dncNode.on('click', null).on('mouseenter', null).on('mouseleave', null)
  selectAll('#dnc_sp').remove()
  selectAll('#b_trains_dnc').remove()
}

//Участковая скорость
async function showDncSpeed(data, openModal, fetchDncUchData) {
  const lastLoad = select('#speed_load_time').node().children[0]
  const txtTime = lastLoad.textContent
  lastLoad.textContent = `${txtTime.slice(0, -5)}${data[0].last}`

  const doc = await xml(icon2)
  const iconElement = doc.documentElement.querySelector('#dnc_sp')

  data.forEach((item) => {
    const dncNode = select('#dnc_active').selectAll(`#dnc_${item.id}`)
    if (!dncNode.empty()) {
      const elClone = iconElement.cloneNode(true)
      setSpeedText('speed1', elClone, item.fact)
      setSpeedText('speed2', elClone, item.plan)
      setSpeedFill(elClone, item.fact, item.plan)

      const speedElement = dncNode.node().appendChild(elClone)
      const speedNode = select(speedElement)

      if (item.id > 100) {
        speedNode
          .on('click', () => {
            handlerClick(item.id, openModal, fetchDncUchData)
          })
          .on('mouseenter', () => {
            speedNode.style('cursor', 'pointer')
          })
          .on('mouseleave', () => {
            speedNode.style('cursor', 'default')
          })
      }
    }
  })
}

function setSpeedText(id, element, txt) {
  const node = element.querySelector(`#${id}`)
  node.children[0].textContent = txt
}

function handlerClick(uid, openModal, fetchDncUchData) {
  console.log('speed:', uid)
  openModal(true)
  fetchDncUchData(uid)
}

function setSpeedFill(element, fact, plan) {
  const node = element.querySelector('#big_rect')

  if (fact < plan) node.setAttribute('fill', fillDown)
  else node.setAttribute('fill', fillUp)
}

//Брошенные поезда
async function showAbandoned(data, openModal, fetchAbandonedTrains) {
  const doc = await xml(abandonedIcon)
  const iconElement = doc.documentElement.querySelector('#b_trains_dnc')
  iconElement.setAttribute('transform', 'translate(0,20)')

  data.forEach((item) => {
    const dncNode = select('#dnc_active').selectAll(`#dnc_${item.disp}`)
    if (!dncNode.empty()) {
      const elClone = iconElement.cloneNode(true)
      const node = elClone.querySelector(`#numb`)
      node.children[0].textContent = item.count

      const abandonedElenemt = dncNode.node().appendChild(elClone)
      const abandonedNode = select(abandonedElenemt)

      abandonedNode
        .on('click', () => {
          handlerAbandonedClick(item.disp, openModal, fetchAbandonedTrains)
        })
        .on('mouseenter', () => {
          abandonedNode.style('cursor', 'pointer')
        })
        .on('mouseleave', () => {
          abandonedNode.style('cursor', 'default')
        })
    }
  })
}

function handlerAbandonedClick(id, openModal, fetchAbandonedTrains) {
  openModal(true)
  fetchAbandonedTrains(id)
}
