import React, {useState, useEffect} from 'react';
import styles from './Settlement.module.scss'

function Money(props) {
  if (props.money) {
    return (
      <span>{props.money.amount} {props.money.currency}</span>
    );
  }
  return null;
}

function DetailsRow(props) {
  const className = props.className || styles.settlementDetailsRow;
  const label = props.label || 'Label';
  const value = props.value || 'Value';
  return (
    <div className={className}>
      <div className={styles.settlementDetailsRowLabel}>{label}</div>
      <div className={styles.settlementDetailsRowValue}>{value}</div>
    </div>
  )
}

function Mismatch(props) {
  const settlement = props.settlement;
  return <div className={styles.settlementDetails}>
    <DetailsRow
      label='Accounting:'
      value={<Money money={settlement.accountingBalance}/>}/>
    <DetailsRow
      label='Banking:'
      value={<Money money={settlement.bankingBalance}/>}/>
    <DetailsRow
      className={styles.settlementDetailsTotal}
      label='Difference:'
      value={<Money money={settlement.balance}/>}/>
  </div>;
}

export function Settlement(props) {

  const [time, setTime] = useState(new Date());
  const [settlement, setSettlement] = useState({settled: true});
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    setInProgress(true);
    fetch('/api/v1/settlements')
      .finally(() => {
        setInProgress(false);
      })
      .then((r) => r.json())
      .then((s) => setSettlement(s));
  }, [time]);

  if (props.time && props.time > time) {
    setTime(props.time);
  }

  if (inProgress) {
    return (<h2>Checking Balance</h2>);
  }

  if (settlement.settled) {
    return (
      <div className={styles.settlement}>
        <h2>Balance settled</h2>
        <h3><Money money={settlement.bankingBalance}/></h3>
      </div>
    );
  }

  return (
    <div className={styles.settlement}>
      <h2>Settle Balance</h2>
      <Mismatch settlement={settlement}/>
    </div>
  );
}