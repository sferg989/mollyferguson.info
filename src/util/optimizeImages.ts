import { JSDOM } from 'jsdom'
import { getImage } from 'astro:assets'

export async function optimizeImages(html: string): Promise<string> {
  const dom = new JSDOM(html)
  const document = dom.window.document

  const images = document.getElementsByTagName('img')

  for (let img of images) {
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt') || ''
    const width = parseInt(img.getAttribute('width') || '800', 10)
    const height = parseInt(img.getAttribute('height') || '600', 10)

    if (src) {
      try {
        const mobileImg = await getImage({
          src: src,
          inferSize: true,
          format: 'webp'
        })
        const desktopImg = await getImage({
          src: src,
          inferSize: true,
          format: 'webp'
        })

        const pictureHtml = `
          <picture>
            <source media="(max-width: 799px)" srcset="${mobileImg.src}" />
            <source media="(min-width: 800px)" srcset="${desktopImg.src}" />
            <img
              src="${desktopImg.src}"
              alt="${alt}"
              width="${desktopImg.attributes.width}"
              height="${desktopImg.attributes.height}"
            />
          </picture>
        `

        const template = document.createElement('template')
        template.innerHTML = pictureHtml.trim()
        img.parentNode?.replaceChild(template.content.firstChild!, img)
      } catch (error) {
        console.error(`Failed to optimize image: ${src}`, error)
      }
    }
  }

  return dom.serialize()
}
