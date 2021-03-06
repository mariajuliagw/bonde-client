const namespace = '/community'

export const communityList = () => namespace
export const communityAdd = () => `${namespace}/new`
export const communityInfo = () => `${namespace}/info`
export const communityMailchimp = () => `${namespace}/mailchimp`
export const communityRecipient = () => `${namespace}/recipient`
export const communityReport = () => `${namespace}/report`

export const communityDomain = () => `${namespace}/domain`
export const communityDomainCreate = (next) => {
  if (next) return `${namespace}/domain/add${next}`
  return `${namespace}/domain/add`
}
export const communityDomainEdit = domain => `${namespace}/domain/${domain.id}/edit`
