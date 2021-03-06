/* @flow */
import { isAutoentrepreneur } from 'Actions/companyStatusActions'
import { React, T } from 'Components'
import SchemeComparaison from 'Components/SchemeComparaison'
import { compose } from 'ramda'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import CompanyStatusNavigation from './CompanyStatusNavigation'

import type { TFunction } from 'react-i18next'

type Props = {
	isAutoentrepreneur: (?boolean) => void,
	t: TFunction
}

const Autoentrepreneur = ({ isAutoentrepreneur, t }: Props) => (
	<>
		<Helmet>
			<title>{t('autoentrepreneur.page.titre', 'Auto-entrepreneur')}</title>
			<meta
				name="description"
				content={
					<T k="autoentrepreneur.page.description">
						Un auto-entrepreneur bénéficie d'un système simplifié de déclaration
						et de paiement, pour lesquelles les impôts et cotisations sociales
						sont basés sur le chiffre d'affaires réalisé chaque mois. C'est un
						choix intéressant si vous n'avez pas besoin de beaucoup de capital
						et que vous souhaitez démarrer rapidement.
					</T>
				}
			/>
		</Helmet>
		<h2>
			<T k="autoentrepreneur.titre">
				Entreprise individuelle ou auto-entrepreneur
			</T>
		</h2>
		<T k="autoentrepreneur.description">
			<p>
				À la différence de l'entreprise individuelle, l'auto-entrepreneur
				bénéficie d'un régime simplifié de déclaration et de paiement : les
				cotisations sociales et l'impôt sur le revenu sont calculés sur le
				chiffre d'affaires encaissé.
			</p>
			<p>
				<strong>Note</strong> : Certaines activités sont exclues de ce statut (
				<a href="https://www.afecreation.fr/pid10375/pour-quelles-activites.html#principales-exclusions">
					{' '}
					voir la liste
				</a>
				). Certaines activités sont réglementées avec une qualification ou une
				expérience professionnelle (
				<a href="https://www.afecreation.fr/pid316/activites-reglementees.html">
					voir la liste
				</a>
				).
			</p>
		</T>
		<div className="ui__ full-width">
			<SchemeComparaison hideAssimiléSalarié />
		</div>

		<CompanyStatusNavigation onSkip={() => isAutoentrepreneur(null)} />
	</>
)

export default compose(
	withTranslation(),
	connect(
		null,
		{ isAutoentrepreneur }
	)
)(Autoentrepreneur)
