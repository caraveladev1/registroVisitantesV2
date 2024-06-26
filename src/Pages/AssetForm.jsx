import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import React, { useState } from 'react';
import { LabelInput } from '../components/LabelInput';
import { ObservationInput } from '../components/ObservationInput';
import { DataTreatmentInput } from '../components/DataTreatmentInput';
import { SubmitButton } from '../components/submitButton';

export function AssetForm() {
	const { t } = useTranslation();
	const [name, setName] = useState('');
	const [document, setDocument] = useState('');
	const [asset, setAsset] = useState('');
	const [observation, setObservation] = useState('');

	function reloadPage() {
		navigate('/');
	}
	async function getAssetData() {}
	async function postAssetData() {}

	return (
		<div className='bg-beige p-5'>
			<h1 className='text-beigeTextText text-center text-4xl font-bold p-10  text-brown'>{t('assettitle')}</h1>
			<form onSubmit={(e) => postAssetData(e)}>
				<section className='caravela-form flex flex-col items-center justify-center gap-5 max-w-[60%] m-auto'>
					<LabelInput
						idLabel='name'
						placeholder={t('namePlaceHolder')}
						required={true}
						onChange={(e) => {
							setName(e.target.files[0]);
						}}
					/>
					<LabelInput
						idLabel='document'
						placeholder={t('documentPlaceHolder')}
						required={true}
						onChange={(e) => {
							setDocument(e.target.files[0]);
						}}
					/>
					<LabelInput
						idLabel='asset'
						placeholder={t('assetPlaceHolder')}
						required={true}
						onChange={(e) => {
							setAsset(e.target.files[0]);
						}}
					/>
					<ObservationInput
						idInput='observationAsset'
						placeholder={t('observation')}
						onChange={(e) => {
							setObservation(e.target.files[0]);
						}}
					/>
					<DataTreatmentInput />
					<SubmitButton />
				</section>
				<div
					id='loader'
					style={{ display: 'none' }}
					className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/[.6] w-full h-full flex justify-center items-center z-50'
				/>
				<div className='p-4 rounded-lg flex items-center justify-center flex-col w-full h-full'>
					<TailSpin
						height='50'
						width='50'
						color='#fff'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
					<p className='text-beigeText text-center ml-2'>Cargando...</p>
				</div>
			</form>
		</div>
	);
}
