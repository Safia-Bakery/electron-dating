import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import useQueryString from '../../hooks/custom/useQueryString'
import AdminHeader from '../../components/AdminHeader'
import Card from '../../components/Card'
import Button from '../../components/Button'
import TableHead from '../../components/TableHead'
import { dateMonthYear } from '../../utils/helpers'
import TableViewBtn from '../../components/TableViewBtn'

const column = [
  { name: '№', key: '' },
  { name: 'name_in_table', key: 'id' },
  { name: 'type', key: 'id' },
  { name: 'date_expire', key: 'fillial.name' },
  { name: 'sync_date', key: 'fillial.name' },
  { name: '', key: '' }
]

const Dishes = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const tableRef = useRef(null)
  const [sort, $sort] = useState<any[]>()
  const page = Number(useQueryString('page')) || 1

  // const {
  //   data: requests,
  //   isLoading: orderLoading,
  //   isFetching: orderFetching,
  //   // refetch,
  // } = useOrders({
  //   department: Departments.cctv,
  //   page,
  //   ...(!!id && { id }),
  //   ...(!!category_id && { category_id }),
  //   ...(!!created_at && {
  //     created_at: dayjs(created_at).format(yearMonthDate),
  //   }),
  //   ...(!!branch?.id && { fillial_id: branch?.id }),
  //   ...(!!request_status && { request_status }),
  //   ...(!!user && { user }),
  //   ...(!!responsible && { responsible }),
  //   ...(!!rate && { rate: !!rate }),
  //   ...(!!urgent?.toString() && { urgent: !!urgent }),
  // });

  // const renderFilter = useMemo(() => {
  //   return <CCTVFilter />;
  // }, []);

  return (
    <Card>
      <AdminHeader title={t('dishes')}>
        <Button green onClick={() => navigate('add')} className="btn btn-success btn-fill">
          {t('add')}
        </Button>
      </AdminHeader>

      <div className="w-full p-4">
        {/* <ItemsCount data={[]} /> */}
        <table ref={tableRef} className="table-hover">
          <TableHead column={column} onSort={(data) => $sort(data)} data={[]}>
            {/* {renderFilter} */}
          </TableHead>

          <tbody>
            <tr>
              <td width="40">1</td>
              <td>Banan</td>
              <td>Siryo</td>
              <td>{dayjs(new Date()).format(dateMonthYear)}</td>
              <td>{dayjs(new Date()).format(dateMonthYear)}</td>
              <td width="40">
                <TableViewBtn onClick={() => null} />
              </td>
            </tr>
            {/* {!!requests?.items?.length &&
              (sort?.length ? sort : requests?.items)?.map((order, idx) => (
                <tr  key={idx}>
                  <td width="40">{handleIdx(idx)}</td>
                  <td width="80">
                    <Link to={`${order?.id}`}>
                      {order?.id}
                    </Link>
                  </td>
                  <td>
                    <span>{order?.user?.full_name}</span>
                  </td>
                  <td>{order?.fillial?.parentfillial?.name}</td>
                  <td>{order?.category?.name}</td>
                  <td>{order?.comments?.[0]?.rating}</td>

                  <td>{dayjs(order?.created_at).format(dateMonthYear)}</td>
                  <td>
                    {!!order?.user_manager
                      ? order?.user_manager
                      : t("not_given")}
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
        {/* {(orderLoading || orderFetching) && <Loading absolute />}
        {!requests?.items?.length && !orderLoading && <EmptyList />}
        {!!requests && <Pagination totalPages={requests.pages} />} */}
      </div>
    </Card>
  )
}

export default Dishes
