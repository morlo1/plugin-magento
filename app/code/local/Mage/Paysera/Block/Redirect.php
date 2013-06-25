<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Paypal
 * @copyright   Copyright (c) 2011 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class Mage_Paysera_Block_Redirect extends Mage_Core_Block_Abstract
{
    protected function _toHtml()
    {
    	$paysera = Mage::getModel('paysera/PaymentMethod');
    	
        $form = new Varien_Data_Form();
        $form->setAction($paysera->getPayURL())
            ->setId('paysera_checkout')
            ->setName('paysera_checkout')
            ->setMethod('POST')
            ->setUseContainer(true);
        foreach ($paysera->getRequest() as $field=>$value) {
        	$form->addField($field, 'hidden', array('name'=>$field, 'value'=>$value));
        }
        $html = '<html><head>';
		$html.= '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
		$html.= '</head><body>';
        $html.= $this->__('...');
        $html.= $form->toHtml();
        $html.= '<script type="text/javascript">document.getElementById("paysera_checkout").submit();</script>';
        $html.= '</body></html>';

        return $html;
    }
}