export const BlogUrl = 'https://luoqi.us.kg/'

export const BlogAuthor = 'LUOQI'

export const GithubName = "keirosang"

export const RepoName = 'blog_Plumbiu'

export const RepoUrl = `https://github.com/keirosang/${RepoName}`

export const RepoLinksUrl = `${RepoUrl}/blob/main/data/links.json`

export const BilibiliId = '11071956'

export const IS_GITPAGE = !!process.env.GITPAGE
export const BasePath = IS_GITPAGE ? `/${RepoName}` : ''
