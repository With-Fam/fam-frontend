// Local Components
import WidgetInfo from '@/components/home/FeatureWidgets/WidgetInfo'
import MembershipWidget from '@/components/home/FeatureWidgets/MembershipWidget'
import CollaborateWidget from '@/components/home/FeatureWidgets/CollaborateWidget'
import PollWidget from '@/components/home/FeatureWidgets/PollWidget'

// Content
import WIDGET_DATA from '@/content/home/widgetsSection'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const FeatureWidgets = (): JSX.Element => (
  <section className="bg-background px-4 py-16 sm:py-24">
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-6 xl:flex-row">
      {WIDGET_DATA.map((widget, index) => {
        const { title, description, service } = widget

        const renderServiceContent = () => {
          switch (service.type) {
            case 'community':
              return (
                <CollaborateWidget
                  key={index}
                  cards={service.cards}
                />
              )

            case 'membership':
              return (
                <MembershipWidget
                  key={index}
                  image={service.image}
                  title={service.title}
                />
              )

            case 'poll':
              return (
                <PollWidget
                  key={index}
                  text={service.text}
                  users={service.users}
                />
              )

            default:
              return null
          }
        }

        return (
          <div
            key={index}
            className="h-[266px] w-full max-w-md overflow-hidden rounded-3xl bg-white p-6"
          >
            <WidgetInfo title={title}>{description}</WidgetInfo>
            {renderServiceContent()}
          </div>
        )
      })}
    </div>
  </section>
)

export default FeatureWidgets
