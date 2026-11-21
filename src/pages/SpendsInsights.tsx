import CustomText from '../components/CustomText'

const SpendsInsights = () => {
  const insightsData = [
    { id: '1', label: 'Status', value: 'At Risk' },
    { id: '2', label: 'Amount limit', value: '10,000 Rs.' },
    { id: '3', label: 'Most Spend Category', value: 'Shopping' },
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        gap: 8,
      }}
    >
      {insightsData.map(insight => (
        <div key={insight.id}>
          <CustomText>
            {insight.id}. {insight.label}: {insight.value}
          </CustomText>
        </div>
      ))}
    </div>
  )
}

export default SpendsInsights
