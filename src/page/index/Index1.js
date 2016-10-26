import React, {Component} from 'react';
import BackBar from '../public/BackBar/BackBar';
import {HorizentalScroll, VerticalScroll} from '../../component/ScrollArea/ScrollArea';
import Selector from '../../component/Selector/Selector';

class Index1 extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    componentDidMount () {

    }

    clickAction () {
        this.props.changeRoute('?page=3');
    }

    selectorCallback (id, data) {
        //console.log(id);
        //console.log(data);
    }

    render() {
        var selectorData = [
            {
                option: '北京',
                value: 12
            },
            {
                option: '上海',
                value: 13
            },
            {
                option: '广州',
                value: 14
            },
            {
                option: '深圳',
                value: 15
            },
            {
                option: '天津',
                value: 16
            },
            {
                option: '重庆',
                value: 17
            },
            {
                option: '成都',
                value: 18
            },
            {
                option: '杭州',
                value: 19
            },
            {
                option: '武汉',
                value: 20
            },
            {
                option: '南京',
                value: 21
            }
        ];
        return (
            <div className="page">
                <BackBar title="第1页"/>
                <div onClick={this.clickAction.bind(this)}>111111</div>
                <HorizentalScroll
                    height={100}
                    lockDefault={false}
                >
                    <ul className="items">
                        <li className="item">1</li>
                        <li className="item">2</li>
                        <li className="item">3</li>
                        <li className="item">4</li>
                        <li className="item">5</li>
                    </ul>
                </HorizentalScroll>
                <Selector
                    data={selectorData}
                    value={20}
                    callback={this.selectorCallback.bind(this)}
                />
                <VerticalScroll
                    height={300}
                >
                    <div className="agreementText" style={{textIndent: 0, textAlign: 'center', fontSize: 18/remStandar + 'rem'}}>
                        微众银行隐私政策
                    </div>
                    <div className="agreementText" style={{textIndent: 0, textAlign: 'center', fontSize: 18/remStandar + 'rem', padding: 0}}>
                        （v2.0版）
                    </div>
                    <div className="agreementText" style={{textIndent: 0}}>重要提示：</div>
                    <div className="agreementText">
                        深圳前海微众银行股份有限公司（以下可简称“微众银行”或“我们”）重视保护用户（以下可简称“您”）的隐私。微众银行依据《微众银行隐私政策》（以下可简称“本政策”）的约定为用户提供服务，本政策在用户和微众银行间具有合同上的法律效力。
                    </div>
                    <div className="agreementText">
                        微众银行在此特别提醒用户认真阅读、充分理解本政策各条款，特别是其中所涉及的免除、限制微众银行责任的条款、对用户权利限制条款、管辖与法律适用条款等。为了特别提示您限制、免责条款以及涉及到您的权益的等内容，这些条款可能以字体加粗形式提示您注意。
                    </div>
                    <div className="agreementText">
                        请用户审慎阅读本政策（未成年人应在监护人陪同下阅读）。当您同意《微众银行隐私政策》时，或访问微众银行网站（https://www.webank.com/，下同）及其相关网站、或是下载、安装、使用微众银行相关客户端时，或您通过微众银行其它自有客户服务渠道、第三方机构合作渠道等使用我们提供的任一服务（以下可统称为“微众银行服务”）时，即表示您已同意我们按照本政策收集、储存、使用和分享您的信息。除非您已阅读并接受本政策所有条款，否则您无权使用微众银行服务。
                    </div>
                    <div className="agreementText">
                        一、引言
                    </div>
                    <div className="agreementText">
                        1.在您使用微众银行服务时，我们可能会收集、储存、使用和分享您的相关信息。我们通过本政策向您说明，我们如何收集、储存、使用和分享这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。
                    </div>
                    <div className="agreementText">
                        2.基于国家相关法律法规的规定，以及为向您提供服务及提升服务质量、向您提供安全、顺畅、高效和个性化的体验的目的（包括支持我们开发新产品或完善已有产品功能），我们按照本政策收集、储存、使用和分享您的信息。
                    </div>
                    <div className="agreementText">
                        二、我们可能如何收集信息
                    </div>
                    <div className="agreementText">
                        1.我们可能会通过以下方式和途径收集您的信息：
                    </div>
                    <div className="agreementText">
                        （1）当您使用微众银行服务时，我们会收集您通过计算机、手机或其他接入设备发送给我们的信息，我们也可能会从微众银行的关联公司或其他第三方获得您的信息。
                    </div>
                    <div className="agreementText">
                        （2）您将第三方管理的账户与您的微众银行账户相关联，并授权微众银行访问此类信息，表示您同意微众银行在遵守本政策的前提下，收集、存储、使用和分享此类信息。例如，我们可以根据您的授权收集您通过社交媒体网站或社交工具软件等途径提供的信息。我们通过此种途径收到的信息因具体提供的网站而异，并受提供信息的网站控制。
                    </div>
                    <div className="agreementText">
                        （3）我们还可能会以其他方式收集有关您的其他信息，例如，通过您与我们的客户服务团队联系收集您的信息、当您对调查做出答复时收集相关结果。
                    </div>
                    <div className="agreementText">
                        2.为了遵守国家相关法律法规的规定，以及为向您提供服务及提升服务质量、向您提供安全、顺畅、高效和个性化的体验的目的，我们收集的信息范围主要包括以下内容：
                    </div>
                    <div className="agreementText">
                        （1）您在注册、使用微众银行账户或微众银行服务时，向我们提供的您的QQ号码、微信号、手机号码或电子邮箱、真实姓名、证件号码、用户照片或是我们要求您提供的其他信息（包括但不限于银行卡号）。我们通过这些信息识别您的身份，以便遵守国家相关法律法规的规定，为您提供服务。
                    </div>
                    <div className="agreementText">
                        （2）您使用的微众银行服务需与您的银行账户等账户关联方能实现时，您需要向我们提供您的银行账户等账户信息。例如，您在开通微众银行账户，将您的银行卡与微众银行账户绑定时，您需向我们提供您的银行卡信息。
                    </div>
                    <div className="agreementText">
                        （3）您使用微众银行服务过程中所产生的支付业务及交易信息，包括但不限于交易双方名称、交易金额、交易时间、交易双方的开户银行名称、银行账户号码等相关信息。您可以通过我们查询您的支付状态或历史交易记录。
                    </div>
                    <div className="agreementText">
                        （4）我们可能会收集您使用微众银行服务的相关操作信息，包括但不限于您的硬件设备型号、您所使用的软件版本信息、您的IP地址、您所在的位置、移动网络信息、标准网络日志数据和其他信息，以尽最大努力保护您的账户安全。
                    </div>
                    <div className="agreementText">
                        三、关于Cookies和其他浏览器技术
                    </div>
                    <div className="agreementText">
                        1.当您使用微众银行服务的时候，我们可能会保存您的用户登录状态并且为您分配一个或多个“Cookie”（一个很小的文本文件），例如：当用户访问一个需要用户登录才可以提供的信息或服务，当用户登录时，我们会把该用户的登录名和密码加密存储在用户计算机的Cookie文件中，由于是不可逆转的加密存储，其他人即使可以使用该用户的计算机，也无法识别出用户的用户名和密码。用户并不需要额外做任何工作，所有的收集、保存和加密工作都由系统自动完成。
                    </div>
                    <div className="agreementText">
                        2.Cookie文件将保存在您的计算机硬盘或设备终端的闪存上，它只能被设置它们的服务器阅读，而且不能执行任何代码或病毒。您可以随时使用浏览器或操作系统软件将其删除。
                    </div>
                    <div className="agreementText">
                        3.为了向您提供更为方便、快捷、顺畅、个性化的服务，我们通过Cookie等技术为您提供以下服务：
                    </div>
                    <div className="agreementText">
                        （1）记住您的账户和密码。例如，cookie可能帮助您省去为使用微众银行服务而重复输入账户和密码。
                    </div>
                    <div className="agreementText">
                        （2）分析您使用微众银行服务的情况。例如，我们可通过cookie、web beacon等技术来了解您使用微众银行服务的具体用途，或哪些网页或服务最受您的欢迎。
                    </div>
                    <div className="agreementText">
                        （3）广告优化。微众银行可能会根据您访问相关网站的统计信息为您显示您可能感兴趣的产品或广告信息。这些统计信息并不包括您的任何个人信息，这些信息可能被用来评估广告的有效度。Cookie、web beacon等技术有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。
                    </div>
                    <div className="agreementText">
                        （4）微众银行也可能通过web beacon技术来统计匿名访问的数据，同样，这些统计信息并不包括您的个人信息。
                    </div>
                    <div className="agreementText">
                        4.您也可以选择“不使用Cookie”或“在使用Cookie时事先通知我”的选项禁止Cookie的产生，但是可能会影响您对某些微众银行服务的使用，或是您无法享受到更加安全、快捷、顺畅、个性化的服务。
                    </div>
                    <div className="agreementText">
                        四、Cookie和web beacon技术也可能会由微众银行的第三方广告合作伙伴使用。这些第三方通过cookie和web beacon收集和使用该等信息的行为，不受本政策约束，而是受该第三方的隐私政策约束，我们不对第三方的cookie或web beacon承担责任。
                    </div>
                    <div className="agreementText">
                        五、我们与您如何保护和存储信息
                    </div>
                    <div className="agreementText">
                        1.我们在法律法规等相关规定要求的时限内收集和存储您的信息，并依法对这些信息进行严格保密。
                    </div>
                    <div className="agreementText">
                        2.为了保障您的信息安全，微众银行会在现有技术水平下采取合理必要的措施来保护您的信息，采取物理、技术和行政管理安全措施来降低丢失、误用、非授权访问、披露和更改的风险，包括但不限于传输层数据加密、防火墙和加密存储、物理访问控制以及信息访问授权控制。为此我们设置了安全程序保护您的信息不会被未经授权的访问所窃取。所有的个人信息被加密储存并放置于专业防火墙内，并请您理解并明白，由于存在的各种各样的恶意手段，即便微众银行尽力采取上述措施，您的信息仍有可能被泄漏、毁损或灭失。我们对此不承担任何承诺或保证，也对此不负任何责任。
                    </div>
                    <div className="agreementText">
                        3.您应审慎使用微众银行服务，并妥善保护好您的个人信息。
                    </div>
                    <div className="agreementText">
                        4.您在使用微众银行服务时，请妥善保管好您的微众银行账号及其密码，我们会通过您的账号及其密码来识别您的身份。一旦您泄漏了微众银行账号及其密码，您可能会丢失您的信息，并可能产生对您不利的法律后果。如您发现您的账号及其密码因任何原因已经或将受到泄漏时，您应该立即和我们取得联系，但在我们知悉此种情况和采取行动前，我们对此不负任何责任。
                    </div>
                    <div className="agreementText">
                        5.您可以随时登录自己的账户查看或根据系统要求修改账户设置和信息，但出于安全性和身份识别等方面的考虑，身份证件等敏感信息可能进行部分掩码隐藏，同时，您可能无法修改注册或激活时提供的某些信息。
                    </div>
                    <div className="agreementText">
                        六、我们可能如何使用信息
                    </div>
                    <div className="agreementText">
                        如上所述，基于国家相关法律法规的规定，以及为向您提供服务及提升服务质量、向您提供安全、顺畅、高效和个性化的体验的目的（包括支持我们开发新产品或完善已有产品功能），您同意我们可能将收集的您的相关信息用作下列用途：
                    </div>
                    <div className="agreementText">
                        1.向您提供微众银行服务；
                    </div>
                    <div className="agreementText">
                        2.基于国家相关主管部门的要求向相关部门进行报告；
                    </div>
                    <div className="agreementText">
                        3.在您使用微众银行服务时，我们将您的信息用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；
                    </div>
                    <div className="agreementText">
                        4.帮助我们设计新产品及服务，改善我们现有服务；
                    </div>
                    <div className="agreementText">
                        5.使我们了解您如何接入和使用微众银行服务，从而满足您的个性化需求；
                    </div>
                    <div className="agreementText">
                        6.为了使您了解微众银行服务的具体情况，您同意我们向您发送营销活动通知、商业性电子信息以及提供与您相关的广告以替代普遍投放的广告；
                    </div>
                    <div className="agreementText">
                        7.评估微众银行服务中的相关广告和其他促销及推广活动的效果，并加以改善；
                    </div>
                    <div className="agreementText">
                        8. 开展市场调查与信息数据分析；
                    </div>
                    <div className="agreementText">
                        9.软件认证或管理软件升级；
                    </div>
                    <div className="agreementText">
                        10.邀请您参与有关我们产品和服务的调查；
                    </div>
                    <div className="agreementText">
                        11.经您授权的其他用途。
                    </div>
                    <div className="agreementText">
                        为了您能享受到更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，以汇集信息或者个性化的方式，用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。
                    </div>
                    <div className="agreementText">
                        七、我们可能如何分享信息
                    </div>
                    <div className="agreementText">
                        我们依国家相关法律法规及本政策的约定保护和存储您的信息，在下列情况下，我们可能会将您的信息与第三方分享：
                    </div>
                    <div className="agreementText">
                        1.当您通过第三方使用微众银行服务时，我们也可能会基于为您提供服务的目的与第三方分享您的一些信息，您同意我们与第三方之间可分享您的信息。我们与第三方之间会签署相关法律文件，我们会尽力去要求第三方对您的信息采取保护措施，但我们无法保证第三方一定会按照我们的要求采取保护措施，我们对此不作任何承诺与保证，亦不对这些主体的行为及后果承担任何责任。
                    </div>
                    <div className="agreementText">
                        2.当您通过微众银行账号登录第三方客户端或网站时，为了您能够方便快捷地使用第三方客户端或网站，我们可能会将您的信息分享给第三方。该第三方按照其与您的相关约定或其独立的隐私政策等内容处理您的信息，微众银行对此不承担责任。
                    </div>
                    <div className="agreementText">
                        3.我们提供的某些服务和（或）产品功能可能由我们的合作伙伴提供或由我们与合作伙伴共同提供，只有将您的信息分享给该第三方，您才能使用上述微众银行服务。
                    </div>
                    <div className="agreementText">
                        4.我们可能与合作伙伴合作举办营销活动，并与其分享活动过程中产生的、为完成活动所必要的一些信息，以便您能参与活动、我们的合作伙伴能及时与您联系、发放奖品等。
                    </div>
                    <div className="agreementText">
                        5.根据法律法规的规定、有权机关的要求或是经您同意。
                    </div>
                    <div className="agreementText">
                        6.我们可能为完成合并、分立、收购或资产转让而将您的信息转移或披露给任何非关联的第三方。
                    </div>
                    <div className="agreementText">
                        7.您与微众银行关于信息分享的其他约定。
                    </div>
                    <div className="agreementText">
                        八、适用范围
                    </div>
                    <div className="agreementText">
                        1.除微众银行明确说明需适用微众银行其他特别制定的单独隐私政策或条款的服务外，本政策适用于您使用的所有微众银行服务。
                    </div>
                    <div className="agreementText">
                        2.如果您在使用微众银行服务的过程中还会使用到第三方的产品或服务，请您遵守第三方的相关隐私政策或规定。例如，您与其进行交易的商户可能会有自己的隐私保护政策，微众银行对他们的行为（包括其隐私政策）不承担任何责任。
                    </div>
                    <div className="agreementText">
                        九、管辖与法律适用
                    </div>
                    <div className="agreementText">
                        1.本政策的生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。
                    </div>
                    <div className="agreementText">
                        2.本协议签订地为中华人民共和国广东省深圳市南山区。
                    </div>
                    <div className="agreementText">
                        3.若您与我们之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地（即中国广东省深圳市南山区）有管辖权的人民法院管辖。
                    </div>
                    <div className="agreementText">
                        十、其他
                    </div>
                    <div className="agreementText">
                        1.本政策所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本政策涵义解释的依据。
                    </div>
                    <div className="agreementText">
                        2.本政策条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
                    </div>
                    <div className="agreementText">
                        3.如您对本政策存在任何疑问，或任何相关的投诉、意见，请联系我们的客服。
                    </div>
                </VerticalScroll>
            </div>
        );
    }

}

export default Index1;
