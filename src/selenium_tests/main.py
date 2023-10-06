import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

from Pages.GetStartedPage import GetStartedPage
from Pages.LoginPage import LoginPage


class TestRegistration(unittest.TestCase):
    """
    Run tests in headless mode.
    Base URL set to 127.0.0.1:3000 because of the github Actions page.
    Make sure to use XPATH where ever you can, because with CSS selectors the script running on github actions did not
    find the elements.
    """

    def setUp(self) -> None:
        options = Options()
        options.add_argument('--headless=new')

        self.driver = webdriver.Chrome(options=options)
        self.get_started_page = GetStartedPage(self.driver)
        self.login_page = LoginPage(self.driver)


    def tearDown(self):
        self.driver.quit()

    def test_url(self):
        """
        Testing whether the loaded page's url is the same as set in the base url.
        :return:
        """
        self.assertEqual('http://127.0.0.1:3000/', self.driver.current_url)

    def test_registration(self):
        """
        Test the 'Get Started' page on Finuncle. At the end of the process when all the fields are filled the button is
        disabled at the moment.
        """
        signup_button_enabled = self.get_started_page.fill_out_registration_form_to_get_status_of_sign_up_button()
        self.assertEqual(False, signup_button_enabled)

    def test_login_with_unregistered_user(self):
        """
         Test login with an unregistered user.
         """
        alert_text = self.login_page.fill_out_login_form_to_get_alert_text()
        self.assertEqual(alert_text,"Network Error")



if __name__ == '__main__':
    unittest.main()
