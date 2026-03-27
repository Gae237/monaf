import Hero from '@/components/hero'
import ProgramsPreview from '@/components/programs-preview'
import CategoriesOverview from '@/components/categories-overview'
import GalleryPreview from '@/components/gallery-preview'
import NewsPreview from '@/components/news-preview'
import ContactQuickInfo from '@/components/contact-quick-info'

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsPreview />
      <CategoriesOverview />
      <GalleryPreview />
      <NewsPreview />
      <ContactQuickInfo />
    </>
  )
}
