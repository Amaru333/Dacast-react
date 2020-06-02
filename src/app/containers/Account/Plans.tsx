import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PlansPage } from '../../pages/Account/Plans/Plans';
import { Plans } from '../../redux-flow/store/Account/Plans/types';
import { ApplicationState } from '../../redux-flow/store';
import { PlansAction, getPlanDetailsAction, changeActivePlanAction } from '../../redux-flow/store/Account/Plans/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface PlansContainerProps {
    // planDetails: Plans;
    getPlanDetails: Function;
    changeActivePlan: Function;
}

const PlansContainer = (props: PlansContainerProps) => {
    // React.useEffect(() => {
    //     if(!props.planDetails) {
    //         props.getPlanDetails();
    //     }
    // }, [])

    const planDetails = {
        "developer": {
              "developerAnnual": {
                "name": "Developer",
                "code": "developer-annual",
                "isActive": false,
                "default_privileges": [
                  {
                    "code": "paywall",
                    "price": {
                      "usd": 7500,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "player-sdk",
                    "price": {
                      "usd": 15000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": true
                  }
                ],
                "default_allowance_code": "default",
                "allowances": [
                  {
                    "code": "default",
                    "defaultBandwidth": 1000,
                    "defaultStorage": 20
                  }
                ],
                "interval_unit": "months",
                "interval_length": 12,
                "discount_percent": 0,
                "is_customizable": true,
                "default_commitment": 1,
                "is_available_per_default": false,
                "default_price": {
                  "usd": 25000,
                  "gbp": 0,
                  "eur": 0,
                  "aud": 0
                }
              }
            },
            "event": {
              "eventAnnual": {
                "name": "Event",
                "code": "event-annual",
                "isActive": false,
                "default_privileges": [
                  {
                    "code": "phone-support",
                    "price": {
                      "usd": 18000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "cname",
                    "price": {
                      "usd": 100000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "china",
                    "price": {
                      "usd": 20000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": true
                  },
                  {
                    "code": "reseller-portal",
                    "price": {
                      "usd": 120000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "aes",
                    "price": {
                      "usd": 30000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  }
                ],
                "default_allowance_code": "default",
                "allowances": [
                  {
                    "code": "default",
                    "defaultBandwidth": 6000,
                    "defaultStorage": 10
                  }
                ],
                "interval_unit": "months",
                "interval_length": 12,
                "discount_percent": 0,
                "is_customizable": false,
                "default_commitment": 1,
                "is_available_per_default": false,
                "default_price": {
                  "usd": 75000,
                  "gbp": 0,
                  "eur": 0,
                  "aud": 0
                }
              }
            },
            "scale": {
              "scaleAnnual": {
                "name": "Annual Scale",
                "code": "scale-annual",
                "isActive": false,
                "default_privileges": [
                  {
                    "code": "cname",
                    "price": {
                      "usd": 90000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "china",
                    "price": {
                      "usd": 120000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": true
                  },
                  {
                    "code": "reseller-portal",
                    "price": {
                      "usd": 120000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  }
                ],
                "default_allowance_code": "OTT",
                "allowances": [
                  {
                    "code": "OTT",
                    "defaultBandwidth": 2000,
                    "defaultStorage": 200
                  },
                  {
                    "code": "LIVE",
                    "defaultBandwidth": 3000,
                    "defaultStorage": 30
                  },
                  {
                    "code": "VOD",
                    "defaultBandwidth": 1000,
                    "defaultStorage": 1000
                  }
                ],
                "interval_unit": "months",
                "interval_length": 12,
                "discount_percent": 25,
                "is_customizable": true,
                "default_commitment": 1,
                "is_available_per_default": true,
                "default_price": {
                  "usd": 300000,
                  "gbp": 0,
                  "eur": 0,
                  "aud": 0
                }
              },
              "scaleMonthly": {
                "name": "Monthly Scale",
                "code": "scale-monthly",
                "isActive": true,
                "default_privileges": [
                  {
                    "code": "cname",
                    "price": {
                      "usd": 7500,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  },
                  {
                    "code": "china",
                    "price": {
                      "usd": 10000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": true
                  },
                  {
                    "code": "reseller-portal",
                    "price": {
                      "usd": 10000,
                      "gbp": 0,
                      "eur": 0,
                      "aud": 0
                    },
                    checked: false,
                    "editable_quantity": false
                  }
                ],
                "default_allowance_code": "OTT",
                "allowances": [
                  {
                    "code": "OTT",
                    "defaultBandwidth": 2000,
                    "defaultStorage": 200
                  },
                  {
                    "code": "LIVE",
                    "defaultBandwidth": 3000,
                    "defaultStorage": 30
                  },
                  {
                    "code": "VOD",
                    "defaultBandwidth": 1000,
                    "defaultStorage": 1000
                  }
                ],
                "interval_unit": "months",
                "interval_length": 1,
                "discount_percent": 0,
                "is_customizable": true,
                "default_commitment": 1,
                "is_available_per_default": false,
                "default_price": {
                  "usd": 25000,
                  "gbp": 0,
                  "eur": 0,
                  "aud": 0
                }
              }
            }
          }

    return (
        planDetails ? 
            <PlansPage planDetails={planDetails} {...props}/>
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

// export function mapStateToProps(state: ApplicationState) {
//     return {
//         planDetails: state.account.plans
//     }
// }

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlansAction>) {
    return {
        getPlanDetails: () => {
            dispatch(getPlanDetailsAction())
        },
        changeActivePlan: (data: Plans) => {
            dispatch(changeActivePlanAction(data))
        }
    }
}

export default connect(null, mapDispatchToProps) (PlansContainer);