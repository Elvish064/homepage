import type { Article, RSSFeed } from '@/types'

export class RSSService {
  private static readonly RSS_URL = 'https://mizuk.elvish.me/atom.xml'

  static async fetchArticles(): Promise<Article[]> {
    try {
      const response = await fetch(`${(this.RSS_URL)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const xmlText = await response.text()
      return this.parseRSSXML(xmlText)
    } catch (error) {
      console.error('获取RSS文章失败:', error)
      return []
    }
  }

  private static parseRSSXML(xmlText: string): Article[] {
    try {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      
      // 检查是否为Atom格式
      const isAtom = xmlDoc.querySelector('feed') !== null;
      
      let articles: Article[] = [];
      
      if (isAtom) {
        // 解析Atom格式
        articles = this.parseAtomFormat(xmlDoc);
      } else {
        // 解析传统RSS格式
        articles = this.parseRSSFormat(xmlDoc);
      }

      return articles;
    } catch (error) {
      console.error('解析RSS XML失败:', error)
      return []
    }
  }

  private static parseRSSFormat(xmlDoc: Document): Article[] {
    const items = xmlDoc.querySelectorAll('item')
    const articles: Article[] = []

    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || ''
      const description = item.querySelector('description')?.textContent || ''
      const link = item.querySelector('link')?.textContent || ''
      const pubDate = item.querySelector('pubDate')?.textContent || ''
      const author = item.querySelector('author')?.textContent || ''
      
      const categories: string[] = []
      const categoryElements = item.querySelectorAll('category')
      categoryElements.forEach(cat => {
        const categoryText = cat.textContent
        if (categoryText) {
          categories.push(categoryText)
        }
      })

      articles.push({
        id: `article-${index + 1}`,
        title: this.cleanText(title),
        description: this.cleanText(description),
        content: this.cleanText(description),
        link,
        pubDate,
        author,
        categories
      })
    })

    return articles
  }

  private static parseAtomFormat(xmlDoc: Document): Article[] {
    const entries = xmlDoc.querySelectorAll('entry')
    const articles: Article[] = []

    entries.forEach((entry, index) => {
      const title = entry.querySelector('title')?.textContent || ''
      
      // Atom格式可能使用summary或content
      const summary = entry.querySelector('summary')?.textContent || ''
      const content = entry.querySelector('content')?.textContent || ''
      const description = summary || content || ''
      
      // Atom格式的链接在<link>标签的href属性中
      const linkElement = entry.querySelector('link')
      const link = linkElement ? (linkElement.getAttribute('href') || '') : ''
      
      // Atom格式使用updated或published而不是pubDate
      const updated = entry.querySelector('updated')?.textContent || ''
      const published = entry.querySelector('published')?.textContent || ''
      const pubDate = updated || published || ''
      
      // Atom格式的作者在<author><name>中
      const authorElement = entry.querySelector('author name')
      const author = authorElement ? authorElement.textContent || '' : ''
      
      const categories: string[] = []
      const categoryElements = entry.querySelectorAll('category')
      categoryElements.forEach(cat => {
        // Atom格式的分类在term属性中
        const term = cat.getAttribute('term')
        if (term) {
          categories.push(term)
        }
      })

      articles.push({
        id: `article-${index + 1}`,
        title: this.cleanText(title),
        description: this.cleanText(description),
        content: this.cleanText(content || description),
        link,
        pubDate,
        author,
        categories
      })
    })

    return articles
  }

  private static cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim()
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }
}