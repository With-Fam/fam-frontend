import { Paragraph } from '@zoralabs/zord'

const Pool = () => {
  return (
    <section className="mt-2 rounded-md bg-background p-4">
      <Paragraph as="p4" className="text-orange">
        Community pool
      </Paragraph>
      <div className="mt-3 flex justify-between">
        <Paragraph as="p1" className="font-abcMedium text-2xl">
          12.32ETH
        </Paragraph>
        <Paragraph as="p4" className="font-abc text-grey">
          $32,032
        </Paragraph>
      </div>
    </section>
  )
}

export default Pool
