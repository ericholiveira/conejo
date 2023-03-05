import { getAxiosError } from '@/lib/common'
import type { DBConnection, Team } from '@prisma/client'
import axios from 'axios'
import { useFormik } from 'formik'
import useConnections from 'hooks/useConnections'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Button, Input, Modal } from 'react-daisyui'
import toast from 'react-hot-toast'
import type { ApiResponse } from 'types'
import * as Yup from 'yup'

const CreateConnection = ({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: (visible: boolean) => void
}) => {
  const { t } = useTranslation('common')
  const { mutateConnection } = useConnections()

  const formik = useFormik({
    initialValues: {
      id: 'Default',
      username:'postgres',
      password:'',
      host:'localhost',
      port:'5432',
      database:'conejo'
    },
    validationSchema: Yup.object().shape({
      id: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string().required(),
      host: Yup.string().required(),
      port: Yup.number().required(),
      database: Yup.string().required()
    }),
    onSubmit: async (values) => {
      try {
        console.log(values)
        const response = await axios.post<ApiResponse<DBConnection>>('/api/connections/', {
          ...values,
        })
        console.log(response)

        const { data: connectionCreated } = response.data

        if (connectionCreated) {
          toast.success(t('connection-created'))
          mutateConnection()
          formik.resetForm()
          setVisible(false)
        }
      } catch (error: any) {
        toast.error(getAxiosError(error))
      }
    },
  })

  return (
    <Modal open={visible}>
      <form onSubmit={formik.handleSubmit} method="POST">
        <Modal.Header className="font-bold">Create Connection</Modal.Header>
        <Modal.Body>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('identifier')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="id"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.id}
                placeholder="Database Connection identifier"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('username')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="username"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('password')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="password"
                type="password"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('host')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="host"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.host}
                placeholder="Host"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('port')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="port"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.port}
                placeholder="Port"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col space-y-4">
            <p>{t('database')}</p>
            <div className="flex justify-between space-x-3">
              <Input
                name="database"
                className="flex-grow"
                onChange={formik.handleChange}
                value={formik.values.database}
                placeholder="Database"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <Button
            type="submit"
            color="primary"
            loading={formik.isSubmitting}
            active={formik.dirty}
          >
            {t('create-connection')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setVisible(!visible)
            }}
          >
            {t('close')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  )
}

export default CreateConnection
